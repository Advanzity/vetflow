import { stripe } from './config';
import { prisma } from '@/lib/prisma/client';
import { VetFlowError } from '@/lib/errors/VetFlowError';
import { ErrorCode } from '@/lib/errors/types';
import { SUBSCRIPTION_PLANS } from '../subscription/types';

export class StripeService {
  /**
   * Create or get a Stripe customer for a user
   */
  async getOrCreateCustomer(userId: string, email: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    });

    if (!user) {
      throw new VetFlowError(ErrorCode.USER_NOT_FOUND, 'User not found');
    }

    // If user already has a Stripe customer ID, return it
    if (user.subscription?.stripeCustomerId) {
      return user.subscription.stripeCustomerId;
    }

    // Create new Stripe customer
    const customer = await stripe.customers.create({
      email,
      metadata: {
        userId,
      },
    });

    return customer.id;
  }

  /**
   * Create a checkout session for subscription
   */
  async createCheckoutSession(userId: string, planId: string, email: string) {
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan || !plan.stripePriceId) {
      throw new VetFlowError(
        ErrorCode.NOT_FOUND,
        'Subscription plan not found or not configured with Stripe'
      );
    }

    const customerId = await this.getOrCreateCustomer(userId, email);

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/subscription?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/subscription?canceled=true`,
      metadata: {
        userId,
        planId,
      },
    });

    return session;
  }

  /**
   * Handle webhook events from Stripe
   */
  async handleWebhookEvent(event: any) {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await this.handleCheckoutSessionCompleted(session);
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await this.handleSubscriptionUpdated(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await this.handleSubscriptionDeleted(subscription);
        break;
      }
    }
  }

  /**
   * Handle completed checkout session
   */
  private async handleCheckoutSessionCompleted(session: any) {
    const { userId, planId } = session.metadata;
    const subscription = await stripe.subscriptions.retrieve(session.subscription);

    await prisma.subscription.create({
      data: {
        userId,
        planId,
        status: 'ACTIVE',
        stripeCustomerId: session.customer,
        stripeSubscriptionId: subscription.id,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });
  }

  /**
   * Handle subscription updates
   */
  private async handleSubscriptionUpdated(stripeSubscription: any) {
    const subscription = await prisma.subscription.findFirst({
      where: { stripeSubscriptionId: stripeSubscription.id },
    });

    if (!subscription) return;

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: this.mapStripeStatus(stripeSubscription.status),
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
      },
    });
  }

  /**
   * Handle subscription deletions
   */
  private async handleSubscriptionDeleted(stripeSubscription: any) {
    const subscription = await prisma.subscription.findFirst({
      where: { stripeSubscriptionId: stripeSubscription.id },
    });

    if (!subscription) return;

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: 'CANCELED',
      },
    });
  }

  /**
   * Map Stripe subscription status to our status
   */
  private mapStripeStatus(stripeStatus: string): 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'UNPAID' {
    switch (stripeStatus) {
      case 'active':
        return 'ACTIVE';
      case 'past_due':
        return 'PAST_DUE';
      case 'canceled':
        return 'CANCELED';
      case 'unpaid':
        return 'UNPAID';
      default:
        return 'CANCELED';
    }
  }

  /**
   * Create webhook endpoint in Stripe
   */
  async createWebhookEndpoint(url: string) {
    return stripe.webhookEndpoints.create({
      url,
      enabled_events: [
        'checkout.session.completed',
        'customer.subscription.updated',
        'customer.subscription.deleted',
      ],
    });
  }
}
