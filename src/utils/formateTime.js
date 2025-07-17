export function formatDateTime(isoString) {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'long' }); // "July"
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // convert 0 to 12 for 12-hour format

  return `${day} ${month}, ${year} ${hours}:${minutes} ${ampm}`;
}
