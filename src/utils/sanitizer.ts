import slugify from 'slugify';
import crypto from 'crypto';

/**
 * Sanitizes and slugifies a string for use in resource names
 * Ensures the slugified string is valid for database names and other resources
 */
export const sanitizeResourceName = (input: string, maxLength = 60): string => {
  // Convert to lowercase and replace non-alphanumeric chars with hyphens
  const sanitized = slugify(input, {
    lower: true,
    strict: true,
    trim: true,
  });
  
  // Ensure it doesn't start with a number (for compatibility with some systems)
  const startsWithNumber = /^[0-9]/.test(sanitized);
  const prefix = startsWithNumber ? 'db-' : '';
  
  // Truncate to maxLength, accounting for prefix
  const maxLengthWithPrefix = prefix ? maxLength - prefix.length : maxLength;
  const truncated = sanitized.substring(0, maxLengthWithPrefix);
  
  return `${prefix}${truncated}`;
};

/**
 * Creates a unique resource name by combining an organization name with a unique suffix
 * Useful when resource names must be globally unique (like database names)
 */
export const createUniqueResourceName = (
  base: string, 
  suffix: string | null = null,
  maxLength = 60
): string => {
  // Get current timestamp for uniqueness if no suffix provided
  const uniqueSuffix = suffix || Date.now().toString(36);
  
  // Sanitize the base name
  const sanitizedBase = sanitizeResourceName(base);
  
  // Calculate available length for the base name, accounting for hyphen and suffix
  const suffixLength = uniqueSuffix.length + 1; // +1 for the hyphen
  const availableLength = maxLength - suffixLength;
  
  // Truncate the base name if necessary
  const truncatedBase = sanitizedBase.substring(0, availableLength);
  
  return `${truncatedBase}-${uniqueSuffix}`;
};

/**
 * Generate a unique slug for an organization
 */
export const generateOrgSlug = async (name: string): Promise<string> => {
  // Basic slugification
  const baseSlug = sanitizeResourceName(name);
  
  // Add a random suffix for uniqueness
  const randomSuffix = crypto.randomBytes(3).toString('hex');
  
  return `${baseSlug}-${randomSuffix}`;
};

/**
 * Securely obscure sensitive information (like tokens) for logging/display
 */
export const obscureSensitiveData = (data: string): string => {
  if (!data) return '';
  
  // Keep first and last 4 chars visible, obscure the rest
  const visibleChars = 4;
  const length = data.length;
  
  if (length <= visibleChars * 2) {
    return '*'.repeat(length);
  }
  
  const firstPart = data.substring(0, visibleChars);
  const lastPart = data.substring(length - visibleChars);
  const obscuredLength = length - (visibleChars * 2);
  
  return `${firstPart}${'*'.repeat(obscuredLength)}${lastPart}`;
};