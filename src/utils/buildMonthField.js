export default date => {
  const newDate = new Date(date);
  const monthNumber = newDate.getMonth();
  const fullYear = newDate.getFullYear();

  return `${mapNumberToMonth(monthNumber)}-${fullYear}`;
};

const mapNumberToMonth = num => {
  const months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwieceń',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ];
  return months[num];
};
