import { ErrorCode } from './types';
import { VetFlowError } from './VetFlowError';
import * as Sentry from '@sentry/nextjs';
import { handlePrismaError } from '../prisma/errors';

export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context?: Record<string, any>
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    const vetFlowError = VetFlowError.fromError(error);
    
    // Log error to Sentry with context
    Sentry.captureException(error, {
      extra: {
        ...context,
        errorCode: vetFlowError.code,
        statusCode: vetFlowError.statusCode,
        details: vetFlowError.details,
      },
    });

    throw vetFlowError;
  }
}

export async function withTransaction<T>(
  operation: () => Promise<T>
): Promise<T> {
  const prisma = (await import('../prisma/client')).prisma;
  
  try {
    const result = await prisma.$transaction(async (tx) => {
      return await operation();
    });
    return result;
  } catch (error) {
    throw handlePrismaError(error);
  }
}

export function assertValidInput<T>(
  input: T,
  validator: (input: T) => boolean,
  message?: string
): void {
  if (!validator(input)) {
    throw new VetFlowError(ErrorCode.INVALID_INPUT, message);
  }
}

export function assertAuthenticated(session: any): void {
  if (!session) {
    throw new VetFlowError(ErrorCode.UNAUTHENTICATED);
  }
}

export function assertAuthorized(condition: boolean, message?: string): void {
  if (!condition) {
    throw new VetFlowError(ErrorCode.UNAUTHORIZED, message);
  }
}

export function assertResourceExists<T>(
  resource: T | null | undefined,
  message?: string
): asserts resource is T {
  if (resource === null || resource === undefined) {
    throw new VetFlowError(ErrorCode.NOT_FOUND, message);
  }
}
