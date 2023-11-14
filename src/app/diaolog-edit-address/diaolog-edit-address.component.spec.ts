import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaologEditAddressComponent } from './diaolog-edit-address.component';

describe('DiaologEditAddressComponent', () => {
  let component: DiaologEditAddressComponent;
  let fixture: ComponentFixture<DiaologEditAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiaologEditAddressComponent]
    });
    fixture = TestBed.createComponent(DiaologEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
