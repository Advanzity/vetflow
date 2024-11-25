import { Session } from 'next-auth';
import { VetFlowError } from '@/lib/errors/VetFlowError';
import { ErrorCode } from '@/lib/errors/types';
import { Feature } from './types';
import { SubscriptionService } from './subscription.service';

const subscriptionService = new SubscriptionService();

export type SubscriptionMiddleware = (session: Session | null) => Promise<void>;

/**
 * Middleware to check if a user has access to a specific feature
 */
export function withFeatureAccess(feature: Feature): SubscriptionMiddleware {
  return async (session: Session | null) => {
    if (!session?.user?.id) {
      throw new VetFlowError(ErrorCode.UNAUTHENTICATED, 'User is not authenticated');
    }

    const hasAccess = await subscriptionService.hasFeatureAccess(session.user.id, feature);
    if (!hasAccess) {
      throw new VetFlowError(
        ErrorCode.INSUFFICIENT_PERMISSIONS,
        'Your subscription plan does not include access to this feature'
      );
    }
  };
}

/**
 * Middleware to validate clinic creation against subscription limits
 */
export function withClinicCreationCheck(): SubscriptionMiddleware {
  return async (session: Session | null) => {
    if (!session?.user?.id) {
      throw new VetFlowError(ErrorCode.UNAUTHENTICATED, 'User is not authenticated');
    }

    await subscriptionService.validateClinicCreation(session.user.id);
  };
}
