
export function getDate(date: Date = new Date()): string {
  date.setDate(date.getDate()); // Apply day offset

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[date.getMonth()];
  const day = date.getDate().toString();
  const year = date.getFullYear().toString();
  return `${month} ${day}, ${year}`;
}

export function dayOfYear(date: Date = new Date()) {
  const now: Date = new Date(date);
  const start: Date = new Date(now.getFullYear(), 0, 0);
  const diff: number = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay: number = 1000 * 60 * 60 * 24;
  const day: number = Math.floor(diff / oneDay);
  return day
}
