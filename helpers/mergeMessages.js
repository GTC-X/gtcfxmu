/**
 * Deep-merge locale messages over a base (typically English).
 * Missing namespaces/keys in the locale file fall back to base strings.
 */
export function deepMergeMessages(base, override) {
  if (override == null || override === undefined) {
    return base;
  }
  if (typeof override !== "object" || Array.isArray(override)) {
    return override;
  }
  if (typeof base !== "object" || base == null || Array.isArray(base)) {
    return override;
  }
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const o = override[key];
    const b = base[key];
    if (
      o &&
      typeof o === "object" &&
      !Array.isArray(o) &&
      b &&
      typeof b === "object" &&
      !Array.isArray(b)
    ) {
      result[key] = deepMergeMessages(b, o);
    } else {
      result[key] = o;
    }
  }
  return result;
}
