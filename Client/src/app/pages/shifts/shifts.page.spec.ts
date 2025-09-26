import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsPage } from './shifts.page';

describe('CreateComponent', () => {
  let component: ShiftsPage;
  let fixture: ComponentFixture<ShiftsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ShiftsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
