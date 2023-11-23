import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-event-popin',
  templateUrl: './event-popin.component.html',
  styleUrls: ['./event-popin.component.scss']
})
export class EventPopinComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(private dialog: MatDialogRef<EventPopinComponent>) {
  }

  ngOnInit(): void {
    //Génération du formuliare pour les events.
    this.eventForm = new FormBuilder().group({
      event: [null, Validators.required]
    });
  }

  //Transfert de la valeur de l'évènement vers la page principale.
  saveEvent() {
    if (this.eventForm.valid) {
      let event = this.eventForm.get('event')?.value;
      this.dialog.close(event);
    }
  }

}
