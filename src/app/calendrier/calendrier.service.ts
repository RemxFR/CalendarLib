import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CalendarEntity} from "./CalendarEntity";

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {

  private URL = 'http://localhost:8080/calendar/monthly-calendar';

  constructor(private httpClient: HttpClient) { }

  public generateCalendar(calendarEntity: CalendarEntity): Observable<Date[]> {
    return this.httpClient.post<Date[]>(this.URL, calendarEntity, {responseType: 'json'});
  }
}
