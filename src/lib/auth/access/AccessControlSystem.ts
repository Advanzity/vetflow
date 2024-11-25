import { prisma } from '@/lib/prisma/client';
import { VetFlowError } from '../../errors/VetFlowError';
import { ErrorCode } from '../../errors/types';
import { Permission, UserRole } from '../types';

export class AccessControlSystem {
  private cache: Map<string, boolean> = new Map(); // Simple in-memory cache

  /**
   * Generate a cache key
   * @param params Parameters to include in the key
   * @returns A string key for the cache
   */
  private generateCacheKey(params: Record<string, any>): string {
    return JSON.stringify(params);
  }

  /**
   * Fetch user roles and permissions from the database using Prisma
   * @param userId User identifier
   * @returns Array of permissions
   * @throws VetFlowError if user or roles are not found
   */
  async getUserPermissions(userId: string): Promise<Permission[]> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: {
              include: { permissions: true },
            },
          },
        },
      },
    });

    if (!user) {
      throw new VetFlowError(ErrorCode.USER_NOT_FOUND, 'User not found');
    }

    const permissions = user.userRoles.flatMap((userRole) => userRole.role.permissions);
    
    if (permissions.length === 0) {
      throw new VetFlowError(ErrorCode.INSUFFICIENT_PERMISSIONS, 'User has no permissions assigned');
    }

    return permissions;
  }

  /**
   * Check if a user has permission (RBAC + ABAC) with caching
   * @param userId User ID
   * @param resource Resource type
   * @param action Action type
   * @param context Additional context for permission check
   * @returns Boolean indicating if permission is granted
   * @throws VetFlowError for unauthorized or invalid access
   */
  async can(userId: string, resource: string, action: string, context: any = {}): Promise<boolean> {
    const cacheKey = this.generateCacheKey({ userId, resource, action, context });
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    let permissions;
    try {
      permissions = await this.getUserPermissions(userId);
    } catch (error) {
      throw VetFlowError.fromError(error);
    }

    // Check RBAC permissions
    for (const permission of permissions) {
      if (permission.resource === resource && permission.action === action) {
        // Evaluate ABAC conditions if present
        if (permission.conditions) {
          const conditionsMet = this.evaluateConditions(permission.conditions, context);
          if (!conditionsMet) {
            throw new VetFlowError(
              ErrorCode.UNAUTHORIZED,
              'Permission denied due to failing ABAC conditions'
            );
          }
        }
        this.cache.set(cacheKey, true);
        return true;
      }
    }

    throw new VetFlowError(
      ErrorCode.INSUFFICIENT_PERMISSIONS,
      'User does not have sufficient permissions for this action'
    );
  }

  /**
   * Evaluate ABAC conditions
   * @param conditions Conditions as JSON
   * @param context Context for evaluation
   * @returns Boolean indicating if conditions are met
   */
  private evaluateConditions(conditions: any, context: any): boolean {
    // Example: Simple attribute checks
    if (conditions.department && conditions.department !== context.user?.attributes?.department) {
      return false;
    }
    if (conditions.sensitivity && conditions.sensitivity === 'high') {
      return false;
    }

    // Extend this logic as needed for complex conditions
    return true;
  }

  /**
   * Clear the cache (optional, for invalidation)
   */
  clearCache() {
    this.cache.clear();
  }
}
