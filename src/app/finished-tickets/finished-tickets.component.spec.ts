import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedTicketsComponent } from './finished-tickets.component';

describe('FinishedTicketsComponent', () => {
  let component: FinishedTicketsComponent;
  let fixture: ComponentFixture<FinishedTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishedTicketsComponent]
    });
    fixture = TestBed.createComponent(FinishedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
