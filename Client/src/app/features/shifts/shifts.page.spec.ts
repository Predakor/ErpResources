import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ShiftsPage } from './shifts.page';

describe('CreateComponent', () => {
  let component: ShiftsPage;
  let fixture: ComponentFixture<ShiftsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShiftsPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShiftsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
