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
    this.eventForm = new FormBuilder().group({
      event: ['', Validators.required]
    });
  }

  saveEvent() {
    let event = this.eventForm.get('event')?.value;
    this.dialog.close(event);
  }

}
