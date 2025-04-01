import pino from 'pino';
import { env } from '../config/environment';

// Configure logger based on environment
const loggerConfig = {
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: env.NODE_ENV !== 'production' 
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  redact: {
    paths: [
      'databaseToken',
      'password',
      'token',
      'authorization',
      '*.password',
      '*.token',
      '*.authorization',
    ],
    censor: '[REDACTED]',
  },
};

// Create and export the logger instance
export const logger = pino(loggerConfig);