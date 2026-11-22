export function generateTimeStamp() {
  let currentDate = new Date();

  let date = currentDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  let time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  let timestamp = `${date} at ${time}`;
  return timestamp;
}
