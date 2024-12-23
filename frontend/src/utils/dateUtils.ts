function extractUTCDate(timestamp: string) {
  const date = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);

  return formattedDate;
}

function extractUTCTime(timestamp: string) {
  const date = new Date(timestamp);

  const formattedTime = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return formattedTime;
}

export { extractUTCDate, extractUTCTime };
