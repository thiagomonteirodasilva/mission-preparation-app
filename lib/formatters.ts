// lib/formatters.ts
// Small helper utilities for formatting dates and other UI-facing transformations.

/**
 * Convert an ISO 8601 timestamp (e.g. 2026-09-22T21:49:10.523Z) to a Brazilian
 * date string in DD/MM/YYYY format. This intentionally omits time-of-day so the
 * list views show only the date as requested by the spec.
 */
export function formatISOToBrazilianDate(iso?: string | null): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (e) {
    return '';
  }
}
