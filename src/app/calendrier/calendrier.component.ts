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

  constructor(private calendarService: CalendrierService, private dialog: MatDialog) {}

  ngOnInit(): void {
    //Création du formulaire
    this.calendarForm = new FormBuilder().group({
      month: ['', {validators: [Validators.required, this.monthInputValidator], updateOn: "blur"}],
      year: [{validators: [Validators.required, this.yearRegexValidator], updateOn: "blur"}]
    });
  }

  //Validator concernant ce qui rentre dans l'Input pour le mois.
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

  //Regex Validator concernant ce qui rentre dans l'Input pour l'année.
  yearRegexValidator(control: AbstractControl<string>) {
    let isError = false;
    const regexYear = /^(19\d\d|2\d{3}|30[0-3]\d)$/;
    if (control.value !== null && control.value !== undefined && !regexYear.test(control.value)) {
      isError = true;
    }
    return isError ? {yearInvalid: true} : null;
  }

  //Méthode pour récuppérer le calendrier mensuel.
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

  /*Méthode pour ajouter un event via une popin et récupérer le calednrier mensuel
   avec l'évènement entrée dans le formulaire de la popin*/
  addEvent(date: Date) {
    const dial = this.dialog.open(EventPopinComponent, {
      height: this.dialogHeight,
      width: this.dialogWidth
    });

    /*APrès la fermeture de la popup, on récupère la valeur de l'évènement inscrit
    et on génère le nouveau calendrier mensuel en l'intégrant à celui-ci*/
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
