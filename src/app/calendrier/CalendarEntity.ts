export class CalendarEntity {

  month!: string;
  year!: string;
  event!: string | undefined;


  constructor(month: string, year: string, event?: string) {
    this.month = month;
    this.year = year;
    this.event = event;
  }
}
