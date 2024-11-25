import { prisma } from '@/lib/prisma/client';
import { VetFlowError } from '@/lib/errors/VetFlowError';
import { ErrorCode } from '@/lib/errors/types';
import { Feature, FEATURES, SubscriptionWithPlan, SubscriptionLimits } from './types';
import { Subscription, SubscriptionStatus } from '@prisma/client';

export class SubscriptionService {
  /**
   * Get a user's active subscription with plan details
   */
  async getUserSubscription(userId: string): Promise<SubscriptionWithPlan | null> {
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId,
      },
      include: {
        plan: {
          include: {
            features: true,
          },
        },
      },
    });

    return subscription;
  }

  /**
   * Check if a user has access to a specific feature
   */
  async hasFeatureAccess(userId: string, feature: Feature): Promise<boolean> {
    const subscription = await this.getUserSubscription(userId);
    
    if (!subscription || subscription.status !== SubscriptionStatus.ACTIVE) {
      return false;
    }

    return subscription.plan.features.some(f => f.name === feature);
  }

  /**
   * Get subscription limits for a user
   */
  async getSubscriptionLimits(userId: string): Promise<SubscriptionLimits> {
    const subscription = await this.getUserSubscription(userId);
    
    if (!subscription || subscription.status !== SubscriptionStatus.ACTIVE) {
      return { maxClinics: 1 }; // Free tier defaults
    }

    return {
      maxClinics: subscription.plan.maxClinics,
    };
  }

  /**
   * Check if a user can create more clinics
   */
  async canCreateClinic(userId: string): Promise<boolean> {
    const [clinicCount, limits] = await Promise.all([
      prisma.clinic.count({
        where: { ownerId: userId },
      }),
      this.getSubscriptionLimits(userId),
    ]);

    return clinicCount < limits.maxClinics;
  }

  /**
   * Validate clinic creation against subscription limits
   */
  async validateClinicCreation(userId: string): Promise<void> {
    const canCreate = await this.canCreateClinic(userId);
    
    if (!canCreate) {
      throw new VetFlowError(
        ErrorCode.INSUFFICIENT_PERMISSIONS,
        'Your subscription plan does not allow creating more clinics. Please upgrade your plan.'
      );
    }
  }

  /**
   * Get all features available to a user
   */
  async getUserFeatures(userId: string): Promise<Feature[]> {
    const subscription = await this.getUserSubscription(userId);
    
    if (!subscription || subscription.status !== SubscriptionStatus.ACTIVE) {
      return [FEATURES.PATIENT_RECORDS]; // Free tier features
    }

    return subscription.plan.features.map(f => f.name as Feature);
  }

  /**
   * Check if subscription is active
   */
  async isSubscriptionActive(userId: string): Promise<boolean> {
    const subscription = await this.getUserSubscription(userId);
    return subscription?.status === SubscriptionStatus.ACTIVE;
  }

  /**
   * Update subscription status
   */
  async updateSubscriptionStatus(
    subscriptionId: string,
    status: SubscriptionStatus
  ): Promise<Subscription> {
    return prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status },
    });
  }
}
