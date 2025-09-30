import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { CreateEmployePage } from './employe-create.component';

describe('EmployeCreateComponent', () => {
  let component: CreateEmployePage;
  let fixture: ComponentFixture<CreateEmployePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmployePage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEmployePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate pesel shorter or longer than 11 digits', () => {
    const peselField = component.fields.find((f) => f.name === 'pesel');
    expect(peselField).toBeTruthy();

    const control = new FormControl('', peselField!.validator);

    // too short
    control.setValue('12345');
    expect(control.valid).toBeFalsy();
    expect(control.errors?.['minlength']).toBeTruthy();

    // too long
    control.setValue('1234567890123');
    expect(control.valid).toBeFalsy();
    expect(control.errors?.['maxlength']).toBeTruthy();

    // exactly 11 and checksum valid
    control.setValue('44051401458');
    expect(control.valid).toBeTruthy();
  });
});
