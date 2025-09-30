import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormComponent } from './form.component';
import { FieldConfig } from './form.model';

describe('FormComponent', () => {
  let component: FormComponent<any>;
  let fixture: ComponentFixture<FormComponent<any>>;
  let ref: HTMLElement;
  const fieldsConfig: FieldConfig[] = [
    { name: 'firstName', label: 'First name', type: 'text', optional: false },
    { name: 'birthDate', label: 'Birth date', type: 'date' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    fixture.componentRef.setInput('onSubmit', () => {});
    fixture.componentRef.setInput('fieldsConfig', fieldsConfig);
    component = fixture.componentInstance;

    ref = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form', () => {
    const target = fixture.debugElement.query(By.css('form'));
    console.log(target);

    expect(target).toBeTruthy();
  });

  it('should render fields', () => {
    expect(ref.querySelector('label[for="firstName"]')?.textContent).toContain('First name');
    expect(ref.querySelector('input#firstName')).not.toBeNull();

    expect(ref.querySelector('label[for="birthDate"]')?.textContent).toContain('Birth date');
    expect(ref.querySelector('p-datepicker#birthDate')).not.toBeNull();
  });

  it('should not have error on initial state', () => {
    expect(ref.querySelector('[data-testID="field-error"]')).toBeFalsy();
  });

  it('should show error when field was left in invalid state', () => {
    const target = ref.querySelector('#firstName') as HTMLInputElement;

    // target.dispatchEvent(new Event('input'));

    target.dispatchEvent(new Event('focus'));
    target.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    expect(ref.querySelector('[data-testid="field-error"]')).toBeTruthy();
  });

  it('should not show error when field is valid', () => {
    const target = ref.querySelector('#firstName') as HTMLInputElement;

    target.value = 'Adam';
    target.dispatchEvent(new Event('input'));
    target.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    expect(ref.querySelector('[data-testid="field-error"]')).toBeFalsy();
  });
});
