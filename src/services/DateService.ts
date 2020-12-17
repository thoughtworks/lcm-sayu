export class DateService {
  readonly monthValues = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  readonly dayValues = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ]

  formatHourAndMinutes(dateTimeStamp: number) {
    const date = new Date(dateTimeStamp)
    const hour = this.formatTwoDigitNumber(date.getHours())
    const minute = this.formatTwoDigitNumber(date.getMinutes())
    return hour + ':' + minute
  }

  formatDayAndNumberDate(dateTimeStamp: number) {
    const date = new Date(dateTimeStamp)
    const day = date.getDay()
    const numberDate = this.formatTwoDigitNumber(date.getDate())
    return this.dayValues[day] + ',' + numberDate
  }

  formatTwoDigitNumber(toFormatNumber: number): string {
    return toFormatNumber < 10
      ? '0' + toFormatNumber.toString()
      : toFormatNumber.toString()
  }

  getMonthName(monthIndex: number): string {
    return this.monthValues[monthIndex]
  }
}
