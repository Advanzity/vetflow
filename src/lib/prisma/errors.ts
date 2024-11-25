import { Prisma } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';

export class PrismaError extends Error {
  code: string;
  meta?: Record<string, any>;

  constructor(error: Prisma.PrismaClientKnownRequestError) {
    super(error.message);
    this.name = 'PrismaError';
    this.code = error.code;
    this.meta = error.meta;
  }
}

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Log to Sentry with additional context
    Sentry.withScope((scope) => {
      scope.setExtra('prismaError', {
        code: error.code,
        meta: error.meta,
        message: error.message,
      });
      Sentry.captureException(error);
    });

    switch (error.code) {
      case 'P2002': // Unique constraint violation
        throw new PrismaError({
          ...error,
          message: `A record with this ${error.meta?.target as string} already exists.`,
        });

      case 'P2003': // Foreign key constraint violation
        throw new PrismaError({
          ...error,
          message: 'This operation would violate referential integrity.',
        });

      case 'P2025': // Record not found
        throw new PrismaError({
          ...error,
          message: 'Record not found.',
        });

      case 'P2014': // The change you are trying to make would violate the required relation
        throw new PrismaError({
          ...error,
          message: 'Invalid relationship between the records.',
        });

      case 'P2016': // Query interpretation error
        throw new PrismaError({
          ...error,
          message: 'Invalid query parameters.',
        });

      default:
        throw new PrismaError({
          ...error,
          message: 'An unexpected database error occurred.',
        });
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    Sentry.captureException(error);
    throw new Error('Invalid data provided to the database operation.');
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    Sentry.captureException(error);
    throw new Error('Failed to initialize database connection.');
  }

  if (error instanceof Error) {
    Sentry.captureException(error);
    throw error;
  }

  throw new Error('An unexpected error occurred.');
}
