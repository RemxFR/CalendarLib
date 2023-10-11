import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPopinComponent } from './event-popin.component';

describe('EventPopinComponent', () => {
  let component: EventPopinComponent;
  let fixture: ComponentFixture<EventPopinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPopinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPopinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
