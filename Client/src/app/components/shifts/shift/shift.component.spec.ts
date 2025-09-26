import { ComponentFixture, TestBed } from '@angular/core/testing';

import { shift } from './shift.component';

describe('ShiftComponent', () => {
  let component: shift;
  let fixture: ComponentFixture<shift>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [shift],
    }).compileComponents();

    fixture = TestBed.createComponent(shift);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
