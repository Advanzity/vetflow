
export enum ErrorCode {
  // Authentication Errors
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',

  // Authorization Errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  INVALID_ROLE = 'INVALID_ROLE',

  // Resource Errors
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  CONFLICT = 'CONFLICT',

  // Clinic Specific Errors
  CLINIC_NOT_FOUND = 'CLINIC_NOT_FOUND',
  CLINIC_ACCESS_DENIED = 'CLINIC_ACCESS_DENIED',
  CLINIC_STAFF_LIMIT_EXCEEDED = 'CLINIC_STAFF_LIMIT_EXCEEDED',

  // User Specific Errors
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  USER_NOT_CLINIC_MEMBER = 'USER_NOT_CLINIC_MEMBER',

  // Validation Errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  // Database Errors
  DATABASE_ERROR = 'DATABASE_ERROR',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  PRISMA_ERROR = 'PRISMA_ERROR',

  // External Service Errors
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',

  // General Errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST'
}

export const ErrorMetadataMap: Record<ErrorCode, { statusCode: number; message: string }> = {
  [ErrorCode.UNAUTHENTICATED]: {
    statusCode: 401,
    message: 'Please log in to continue',
  },
  [ErrorCode.INVALID_CREDENTIALS]: {
    statusCode: 401,
    message: 'Invalid email or password',
  },
  [ErrorCode.SESSION_EXPIRED]: {
    statusCode: 401,
    message: 'Your session has expired. Please log in again',
  },
  [ErrorCode.EMAIL_NOT_VERIFIED]: {
    statusCode: 401,
    message: 'Please verify your email address to continue',
  },
  [ErrorCode.UNAUTHORIZED]: {
    statusCode: 403,
    message: 'You do not have permission to perform this action',
  },
  [ErrorCode.INSUFFICIENT_PERMISSIONS]: {
    statusCode: 403,
    message: 'You do not have sufficient permissions',
  },
  [ErrorCode.INVALID_ROLE]: {
    statusCode: 403,
    message: 'Invalid role specified',
  },
  [ErrorCode.NOT_FOUND]: {
    statusCode: 404,
    message: 'Resource not found',
  },
  [ErrorCode.ALREADY_EXISTS]: {
    statusCode: 409,
    message: 'Resource already exists',
  },
  [ErrorCode.CONFLICT]: {
    statusCode: 409,
    message: 'Operation would result in a conflict',
  },
  [ErrorCode.CLINIC_NOT_FOUND]: {
    statusCode: 404,
    message: 'Clinic not found',
  },
  [ErrorCode.CLINIC_ACCESS_DENIED]: {
    statusCode: 403,
    message: 'Access to this clinic is denied',
  },
  [ErrorCode.CLINIC_STAFF_LIMIT_EXCEEDED]: {
    statusCode: 400,
    message: 'Clinic staff limit has been exceeded',
  },
  [ErrorCode.USER_NOT_FOUND]: {
    statusCode: 404,
    message: 'User not found',
  },
  [ErrorCode.USER_ALREADY_EXISTS]: {
    statusCode: 409,
    message: 'A user with this email already exists',
  },
  [ErrorCode.USER_NOT_CLINIC_MEMBER]: {
    statusCode: 403,
    message: 'User is not a member of this clinic',
  },
  [ErrorCode.VALIDATION_ERROR]: {
    statusCode: 400,
    message: 'Invalid input data',
  },
  [ErrorCode.INVALID_INPUT]: {
    statusCode: 400,
    message: 'Invalid input provided',
  },
  [ErrorCode.DATABASE_ERROR]: {
    statusCode: 500,
    message: 'A database error occurred',
  },
  [ErrorCode.TRANSACTION_FAILED]: {
    statusCode: 500,
    message: 'Database transaction failed',
  },
  [ErrorCode.PRISMA_ERROR]: {
    statusCode: 500,
    message: 'A database operation failed',
  },
  [ErrorCode.EXTERNAL_SERVICE_ERROR]: {
    statusCode: 502,
    message: 'External service error',
  },
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    statusCode: 500,
    message: 'An internal server error occurred',
  },
  [ErrorCode.BAD_REQUEST]: {
    statusCode: 400,
    message: 'Invalid request',
  },
};
