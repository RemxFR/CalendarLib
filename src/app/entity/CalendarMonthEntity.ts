export class CalendarMonthEntity {
  calendarDate!: Date;
  event!: string | undefined;

  constructor(date: Date, event?: string) {
    this.calendarDate = date;
    this.event = event;
  }
}
