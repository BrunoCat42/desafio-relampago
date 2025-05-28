function isEmpty(text?: string): boolean {
  return !text || text.trim() === "";
}

function isFutureDate(date: string): boolean {
  const today = new Date();
  const inputDate = new Date(date);
  return inputDate.getTime() >= today.getTime();
}