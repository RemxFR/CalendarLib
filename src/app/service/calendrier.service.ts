import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CalendarEntity} from "../entity/CalendarEntity";
import {CalendarMonthEntity} from "../entity/CalendarMonthEntity";

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {

  private GENERATE_CLASSIC_CALENDAR_URL = 'http://localhost:8080/calendar/monthly-calendar';
  private GENERATE_CALENDAR_WITH_EVENT_URL = 'http://localhost:8080/calendar/monthly-calendar-with-event';

  constructor(private httpClient: HttpClient) { }

  public generateCalendar(calendarEntity: CalendarEntity): Observable<CalendarMonthEntity[]> {
    return this.httpClient.post<CalendarMonthEntity[]>(this.GENERATE_CLASSIC_CALENDAR_URL, calendarEntity, {responseType: 'json'});
  }

  public generateCalendarWithEvent(calendarEntity: CalendarMonthEntity): Observable<CalendarMonthEntity[]> {
    return this.httpClient.post<CalendarMonthEntity[]>(this.GENERATE_CALENDAR_WITH_EVENT_URL, calendarEntity, {responseType: 'json'});
  }
}
