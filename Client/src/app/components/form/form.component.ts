import { Component, computed, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'erp-form',
  imports: [ReactiveFormsModule, Button, FloatLabel, InputTextModule],
  template: `
    <form [formGroup]="formConfig()" (submit)="handleSubmit()" class="flex flex-col gap-8">
      <h2 class="text-3xl">
        <ng-content select="[form-title]"></ng-content>
      </h2>

      @for (field of fields(); track field){
      <p-floatLabel>
        <label [for]="field">{{ field }}</label>
        <input [id]="field" pInputText type="text" [formControlName]="field" />
        @if (fieldHasError(field)()) {
        <span class="text-red-500">{{ fieldHasError(field)() }}</span>
        }
      </p-floatLabel>
      }

      <p-button type="submit">
        <ng-content select="[form-submit]">Submit</ng-content>
      </p-button>
    </form>
  `,
})
export class FormComponent<TForm extends Record<string, any>> {
  formConfig = input.required<FormGroup<TForm>>();
  onSubmit = input.required<(value: any) => void>();

  fields = computed(() => Object.keys(this.formConfig().controls));

  fieldHasError = (field: string) =>
    computed(() => {
      const control = this.formConfig().controls[field] as FormControl;

      if (!control || !control.errors) {
        return false;
      }

      if (!control.touched && !control.dirty) {
        return false;
      }

      const firstKey = Object.keys(control.errors)[0];
      return control.errors[firstKey];
    });

  handleSubmit() {
    if (!this.formConfig().valid) {
      alert('please correct the form');
      return;
    }

    const value = this.formConfig().value as TForm;
    console.log(value);

    this.onSubmit()(value);
  }
}
