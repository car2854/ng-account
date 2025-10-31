export const formatDateHelper = (dateStr: string, format: string = 'yyyy-MM-dd'): string => {

  const date = new Date(dateStr);

  const yyyy = date.getFullYear();
  const yy = String(yyyy).slice(-2);
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const HH = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace(/yyyy/g, yyyy.toString())
    .replace(/yy/g, yy)
    .replace(/MM/g, MM)
    .replace(/dd/g, dd)
    .replace(/HH/g, HH)
    .replace(/mm/g, mm)
    .replace(/ss/g, ss);
};
