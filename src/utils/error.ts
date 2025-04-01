// Custom error classes for better error handling

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly errorCode?: string;
  
    constructor(
      message: string, 
      statusCode: number, 
      isOperational = true, 
      errorCode?: string
    ) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.errorCode = errorCode;
      
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class BadRequestError extends AppError {
    constructor(message = 'Bad Request', errorCode?: string) {
      super(message, 400, true, errorCode);
    }
  }
  
  export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized', errorCode?: string) {
      super(message, 401, true, errorCode);
    }
  }
  
  export class ForbiddenError extends AppError {
    constructor(message = 'Forbidden', errorCode?: string) {
      super(message, 403, true, errorCode);
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(message = 'Resource not found', errorCode?: string) {
      super(message, 404, true, errorCode);
    }
  }
  
  export class ConflictError extends AppError {
    constructor(message = 'Resource already exists', errorCode?: string) {
      super(message, 409, true, errorCode);
    }
  }
  
  export class InternalServerError extends AppError {
    constructor(message = 'Internal Server Error', errorCode?: string) {
      super(message, 500, false, errorCode);
    }
  }
  
  export class ServiceUnavailableError extends AppError {
    constructor(message = 'Service temporarily unavailable', errorCode?: string) {
      super(message, 503, true, errorCode);
    }
  }