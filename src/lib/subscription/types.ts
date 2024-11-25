import { PlanFeature, SubscriptionPlan, SubscriptionStatus } from '@prisma/client';

export interface SubscriptionWithPlan {
  id: string;
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  plan: SubscriptionPlan & {
    features: PlanFeature[];
  };
}

export interface FeatureFlag {
  name: string;
  isEnabled: boolean;
}

export const FEATURES = {
  MULTIPLE_CLINICS: 'multiple_clinics',
  PATIENT_RECORDS: 'patient_records',
  APPOINTMENTS: 'appointments',
  INVENTORY: 'inventory',
  ANALYTICS: 'analytics',
  STAFF_MANAGEMENT: 'staff_management',
  CLIENT_PORTAL: 'client_portal',
  API_ACCESS: 'api_access',
} as const;

export type Feature = typeof FEATURES[keyof typeof FEATURES];

export interface SubscriptionLimits {
  maxClinics: number;
}

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  BASIC: {
    name: 'Basic',
    features: [
      FEATURES.PATIENT_RECORDS,
      FEATURES.APPOINTMENTS,
      FEATURES.INVENTORY,
    ],
    maxClinics: 1,
  },
  PROFESSIONAL: {
    name: 'Professional',
    features: [
      FEATURES.PATIENT_RECORDS,
      FEATURES.APPOINTMENTS,
      FEATURES.INVENTORY,
      FEATURES.ANALYTICS,
      FEATURES.STAFF_MANAGEMENT,
      FEATURES.CLIENT_PORTAL,
    ],
    maxClinics: 3,
  },
  ENTERPRISE: {
    name: 'Enterprise',
    features: [
      FEATURES.PATIENT_RECORDS,
      FEATURES.APPOINTMENTS,
      FEATURES.INVENTORY,
      FEATURES.ANALYTICS,
      FEATURES.STAFF_MANAGEMENT,
      FEATURES.CLIENT_PORTAL,
      FEATURES.API_ACCESS,
      FEATURES.MULTIPLE_CLINICS,
    ],
    maxClinics: 999, // Unlimited for practical purposes
  },
} as const;
