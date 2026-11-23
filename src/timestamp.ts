export function generateTimeStamp() {
  const currentDate = new Date();

  const date = currentDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const timestamp = `${date} at ${time}`;
  return timestamp;
}
