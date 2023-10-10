import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CalendarEntity} from "./CalendarEntity";
import {CalendrierService} from "./calendrier.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {
  calendarForm!: FormGroup;
  caldendarEntity!: CalendarEntity;
  monthCalendar!: Date[];

  constructor(private calendarService: CalendrierService) {
  }

  ngOnInit(): void {
    this.calendarForm = new FormBuilder().group({
      month: ['', {validators: [Validators.required, this.monthInputValidator], updateOn: "blur"}],
      year: ['', {validators: [Validators.required, this.yearRegexValidator], updateOn: "blur"}]
    })
  }

  monthInputValidator(control: AbstractControl<string>) {
    let isError = false;
    const regexMonth = /^\d+$/;
    if (control.value !== null && control.value !== undefined && !regexMonth.test(control.value)) {
      isError = true;
    }
    if (+control.value < 1 || +control.value > 12) {
      isError = true;
    }
    return isError ? {monthInvalid: true} : null;
  }

  yearRegexValidator(control: AbstractControl<string>) {
    let isError = false;
    const regexYear = /^(19\d\d|2\d{3}|30[0-3]\d)$/;
    if (control.value !== null && control.value !== undefined && !regexYear.test(control.value)) {
      isError = true;
    }
    return isError ? {yearInvalid: true} : null;
  }


  saveDate() {
    this.monthCalendar = [];
    let month = this.calendarForm.get('month')?.value;
    let year = this.calendarForm.get('year')?.value;
    this.caldendarEntity = new CalendarEntity(month, year);
    this.calendarService.generateCalendar(this.caldendarEntity).subscribe((data: Date[]) => {
      for (let i = 0; i < data.length; i++) {
        this.monthCalendar.push(data[i]);
      }
    });
  }

  addEvent(date: Date) {
  }
}
