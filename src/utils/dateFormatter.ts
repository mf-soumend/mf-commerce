export const getDateTime = (timeStamp: number) => {
  const now = new Date();
  const date = new Date(timeStamp);
  const diffInMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days === 0) {
    if (hours === 0) {
      if (minutes === 0) {
        return `${seconds}second${seconds > 1 ? "s" : ""} ago`;
      } else {
        return `${minutes}minute${minutes > 1 ? "s" : ""} ago`;
      }
    } else {
      return `${hours}hour${hours > 1 ? "s" : ""} ago`;
    }
  } else if (days <= 30) {
    return `${days}day${days > 1 ? "s" : ""} ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
};
