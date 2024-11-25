import { Session } from 'next-auth';
import { VetFlowError } from '../../errors/VetFlowError';
import { ErrorCode } from '../../errors/types';
import { AccessControlSystem } from './AccessControlSystem';

const accessControlSystem = new AccessControlSystem();

export type AccessControlMiddleware = (session: Session | null) => Promise<void>;

/**
 * Creates a middleware function that checks if the user has the required permission
 * @param resource The resource type to check permissions for
 * @param action The action type to check permissions for
 * @param context Optional context for ABAC evaluation
 * @returns A middleware function that throws if the user doesn't have permission
 */
export function withPermission(
  resource: string,
  action: string,
  context: Record<string, any> = {}
): AccessControlMiddleware {
  return async (session: Session | null) => {
    if (!session?.user?.id) {
      throw new VetFlowError(ErrorCode.UNAUTHENTICATED, 'User is not authenticated');
    }

    try {
      await accessControlSystem.can(session.user.id, resource, action, context);
    } catch (error) {
      throw VetFlowError.fromError(error);
    }
  };
}

// Common permission middleware creators

// Hook for client-side permission checks
export function usePermission(resource: string, action: string, context = {}) {
  const accessControlSystem = new AccessControlSystem();
  
  return async (userId: string): Promise<boolean> => {
    try {
      return await accessControlSystem.can(userId, resource, action, context);
    } catch (error) {
      return false;
    }
  };
}

// Clear the permission cache (useful for testing or when permissions change)
export function clearPermissionCache() {
  accessControlSystem.clearCache();
}
