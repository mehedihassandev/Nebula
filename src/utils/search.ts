/**
 * Fuzzy matches a query against a target string.
 * Example: query "st" matches target "settings" because 's' and 't' appear in that order.
 */
export const fuzzyMatch = (query: string, target: string): boolean => {
  if (!query) return true;
  if (!target) return false;

  const lowerQuery = query.toLowerCase();
  const lowerTarget = target.toLowerCase();

  let queryIdx = 0;
  let targetIdx = 0;

  while (queryIdx < lowerQuery.length && targetIdx < lowerTarget.length) {
    if (lowerQuery[queryIdx] === lowerTarget[targetIdx]) {
      queryIdx++;
    }
    targetIdx++;
  }

  return queryIdx === lowerQuery.length;
};
