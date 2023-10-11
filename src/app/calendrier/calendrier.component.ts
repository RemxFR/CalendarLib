import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CalendarEntity} from "../entity/CalendarEntity";
import {CalendrierService} from "../service/calendrier.service";
import {MatDialog} from "@angular/material/dialog";
import {EventPopinComponent} from "../popin/event-popin/event-popin.component";
import {CalendarMonthEntity} from "../entity/CalendarMonthEntity";

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {
  calendarForm!: FormGroup;
  caldendarEntity!: CalendarEntity;
  monthCalendarWithEvent!: CalendarMonthEntity[];
  private dialogHeight = "350px";
  private dialogWidth = "350px";

  constructor(private calendarService: CalendrierService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.calendarForm = new FormBuilder().group({
      month: ['', {validators: [Validators.required, this.monthInputValidator], updateOn: "blur"}],
      year: [{validators: [Validators.required, this.yearRegexValidator], updateOn: "blur"}]
    });
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

    let month = this.calendarForm.get('month')?.value;
    let year = this.calendarForm.get('year')?.value;
    this.caldendarEntity = new CalendarEntity(month, year);
    this.calendarService.generateCalendar(this.caldendarEntity).subscribe((data: CalendarMonthEntity[]) => {
      this.monthCalendarWithEvent = [];
      for (let i = 0; i < data.length; i++) {
        this.monthCalendarWithEvent.push(data[i]);
      }
    });
  }

  addEvent(date: Date) {
    const dial = this.dialog.open(EventPopinComponent, {
      height: this.dialogHeight,
      width: this.dialogWidth
    });
    dial.afterClosed().subscribe(event => {
      this.monthCalendarWithEvent = [];
      let newDate = new Date(date);
      let calendarEntity = new CalendarMonthEntity(newDate, event);
      this.calendarService.generateCalendarWithEvent(calendarEntity).subscribe(
        data => {
          for (let i = 0; i < data.length; i++) {
            this.monthCalendarWithEvent.push(data[i]);
          }
        }
      );
    })
  }
}
