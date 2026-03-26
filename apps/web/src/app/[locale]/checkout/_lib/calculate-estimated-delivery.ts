export interface EstimatedDelivery {
  earliest: Date
  latest: Date
}

/**
 * Calculates estimated delivery date range by adding business days (Mon–Fri),
 * skipping weekends. Does NOT account for holidays.
 */
export function calculateEstimatedDelivery(
  businessDaysMin: number,
  businessDaysMax: number,
  fromDate: Date = new Date(),
): EstimatedDelivery {
  return {
    earliest: addBusinessDays(fromDate, businessDaysMin),
    latest: addBusinessDays(fromDate, businessDaysMax),
  }
}

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date)
  let remaining = days

  while (remaining > 0) {
    result.setDate(result.getDate() + 1)
    const dayOfWeek = result.getDay()
    // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      remaining--
    }
  }

  return result
}

/** Formats a date range as "Apr 2–6" or "Apr 30 – May 2". */
export function formatDeliveryRange(earliest: Date, latest: Date, locale = 'en-US'): string {
  const sameMonth = earliest.getMonth() === latest.getMonth()

  const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'short' })
  const dayFormatter = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' })

  if (sameMonth) {
    const month = monthFormatter.format(earliest)
    return `${month} ${earliest.getDate()}–${latest.getDate()}`
  }

  return `${dayFormatter.format(earliest)} – ${dayFormatter.format(latest)}`
}
