export const toFormatDateTime = (
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    // second: undefined,
    hour12: false
  }
) => {
  const formatedDate = new Date(date).toLocaleString('fa-ir', options);
  return formatedDate.split(',').join(' ');
};
