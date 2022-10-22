export const getTimeSince = (date: number) => {
  let seconds = Math.floor((+new Date() - +date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " лет";
  }

  interval = seconds / 2592000;

  if (interval > 1) {
    return Math.floor(interval) + " мес.";
  }

  interval = seconds / 86400;

  if (interval > 1) {
    return Math.floor(interval) + " д.";
  }

  interval = seconds / 3600;

  if (interval > 1) {
    return Math.floor(interval) + " ч.";
  }

  interval = seconds / 60;

  if (interval > 1) {
    return Math.floor(interval) + " мин.";
  }

  return Math.floor(seconds) + " seconds";
};

export const getTime = (date: string) => {
  const newDate = new Date(date);

  const time = newDate.toLocaleTimeString("ru", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const timeSince = getTimeSince(+newDate);

  return `${timeSince} назад, ${time}`;
};
