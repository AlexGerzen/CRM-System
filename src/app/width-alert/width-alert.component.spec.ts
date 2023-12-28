import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidthAlertComponent } from './width-alert.component';

describe('WidthAlertComponent', () => {
  let component: WidthAlertComponent;
  let fixture: ComponentFixture<WidthAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WidthAlertComponent]
    });
    fixture = TestBed.createComponent(WidthAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
