export const getDayName = (day: string) => {
  switch (day) {
    case 'monday':
      return 'Poniedziałek';
    case 'tuesday':
      return 'Wtorek';
    case 'wednesday':
      return 'Środa';
    case 'thursday':
      return 'Czwartek';
    case 'friday':
      return 'Piątek';
    case 'saturday':
      return 'Sobota';
    case 'sunday':
      return 'Niedziela';
    default:
      return day;
  }
};
