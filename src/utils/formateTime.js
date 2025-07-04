function formatDateTime(isoString) {
  const date = new Date(isoString);

  const options = {
    year: 'numeric',
    month: 'long', // use '2-digit' or 'short' for different formats
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // or false for 24-hour format
  };

  return date.toLocaleString(undefined, options);
}
