export const safeParseInt = (value: string | null) => {
  if (value == null) return null;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
};
