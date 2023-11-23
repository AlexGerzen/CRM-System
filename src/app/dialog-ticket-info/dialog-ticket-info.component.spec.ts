import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTicketInfoComponent } from './dialog-ticket-info.component';

describe('DialogTicketInfoComponent', () => {
  let component: DialogTicketInfoComponent;
  let fixture: ComponentFixture<DialogTicketInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogTicketInfoComponent]
    });
    fixture = TestBed.createComponent(DialogTicketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
