export const normalizeDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; // => "2025-06-05"
};

export const findTimeInString = (str: string) => {
    if (str.length > 0) {
        const reg = /\d{2}:\d{2}/g
        return `${str.match(reg)}`
    }
}