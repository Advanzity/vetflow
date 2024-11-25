import { ErrorCode, ErrorMetadataMap } from './types';
import { Prisma } from '@prisma/client';

export class VetFlowError extends Error {
  public code: ErrorCode;
  public statusCode: number;
  public details?: Record<string, any>;

  constructor(
    code: ErrorCode,
    message?: string,
    details?: Record<string, any>
  ) {
    const metadata = ErrorMetadataMap[code];
    super(message || metadata.message);

    this.name = 'VetFlowError';
    this.code = code;
    this.statusCode = metadata.statusCode;
    this.details = details;

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, VetFlowError);
  }

  static fromError(error: unknown): VetFlowError {
    if (error instanceof VetFlowError) {
      return error;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002': // Unique constraint violation
          return new VetFlowError(ErrorCode.ALREADY_EXISTS, `A record with this ${error.meta?.target as string} already exists`);
        case 'P2003': // Foreign key constraint violation
          return new VetFlowError(ErrorCode.DATABASE_ERROR, 'Operation would violate data integrity');
        case 'P2025': // Record not found
          return new VetFlowError(ErrorCode.NOT_FOUND, 'Record not found');
        default:
          return new VetFlowError(ErrorCode.PRISMA_ERROR, error.message, {
            code: error.code,
            meta: error.meta,
          });
      }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return new VetFlowError(ErrorCode.VALIDATION_ERROR, error.message);
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return new VetFlowError(ErrorCode.DATABASE_ERROR, 'Failed to initialize database connection');
    }

    if (error instanceof Error) {
      return new VetFlowError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        error.message,
        {
          originalError: error.message,
        }
      );
    }

    return new VetFlowError(
      ErrorCode.INTERNAL_SERVER_ERROR,
      'An unknown error occurred',
      {
        originalError: String(error),
      }
    );
  }
}
