export const sanitizeString = (value: string): string => {
  return value.trim().replace(/[<>]/g, "");
};

export const sanitizeObject = <T extends Record<string, unknown>>(
  obj: T,
): T => {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
};
