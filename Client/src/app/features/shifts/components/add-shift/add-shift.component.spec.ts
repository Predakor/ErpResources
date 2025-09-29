import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShift } from './add-shift.component';

describe('AddShiftComponent', () => {
  let component: AddShift;
  let fixture: ComponentFixture<AddShift>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShift],
    }).compileComponents();

    fixture = TestBed.createComponent(AddShift);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
