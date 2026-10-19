// Pod pricing: peak/off-peak hourly rates and duration totals.

// Pricing logic
export const toHour24 = (timeStr) => {
  if(!timeStr) return null;
  const hr = parseInt(timeStr, 10);
  if (Number.isNaN(hr)) return null;
  const isPM = timeStr.includes("PM") && hr !== 12;
  return isPM ? hr + 12 : (timeStr.includes("PM") && hr===12 ? 12 : hr % 24);
};

export const isPeakTime = (timeStr, dateStr) => {
  const hour24 = toHour24(timeStr);
  if(hour24==null) return true;
  const isWeekend = dateStr&&(dateStr.startsWith("Sat")||dateStr.startsWith("Sun"));
  // Make it clearly mixed: weekends have both peak and off-peak too
  if (isWeekend) return (hour24 >= 10 && hour24 < 22);
  // Weekdays: peak is morning commute + evening
  return (hour24 >= 7 && hour24 < 10) || (hour24 >= 16 && hour24 < 22);
};

export const getPrice = (pod, timeStr, dateStr, durStr) => {
  // Slightly higher base pricing
  const base = pod==="PRIVATE POD" ? Math.round(40 * 1.75) : Math.round(26 * 1.75);
  const peak = isPeakTime(timeStr, dateStr);
  const hourly = peak ? base : Math.round(base * 0.7);
  let hrs;
  if (durStr==="2 hrs") hrs = 2;
  else if (durStr==="3 hrs") hrs = 3;
  else if (typeof durStr==="string" && durStr.endsWith("x 30 min")) {
    const count = parseInt(durStr.split("x")[0].trim(),10);
    hrs = (isNaN(count)?1:count) * 0.5;
  } else {
    hrs = 1;
  }
  return {hourly, total:hourly*hrs, peak, hrs};
};
