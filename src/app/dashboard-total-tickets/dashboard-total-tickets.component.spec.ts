import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTotalTicketsComponent } from './dashboard-total-tickets.component';

describe('DashboardTotalTicketsComponent', () => {
  let component: DashboardTotalTicketsComponent;
  let fixture: ComponentFixture<DashboardTotalTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTotalTicketsComponent]
    });
    fixture = TestBed.createComponent(DashboardTotalTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
