import { Component, computed, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FieldConfig } from './form.model';
import { FormService } from './form.service';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'erp-form',
  imports: [ReactiveFormsModule, Button, FloatLabel, InputTextModule, DatePicker],
  template: `
    <form [formGroup]="formConfig()" (submit)="handleSubmit()" class="flex flex-col gap-8">
      <h2 class="text-3xl">
        <ng-content select="[form-title]"></ng-content>
      </h2>

      @for (field of fieldsConfig(); track field){
      <p-floatLabel>
        <label [for]="field">{{ field.label }}</label>
        @switch (field.type) { @case("date"){
        <p-datepicker
          [id]="field.name"
          [showTime]="true"
          [hourFormat]="'24'"
          [iconDisplay]="'input'"
          [showIcon]="true"
          [formControlName]="field.name"
        />
        } @default {
        <input [id]="field.name" pInputText [type]="field.type" [formControlName]="field.name" />
        } } @if (fieldHasError(field.name)()) {
        <span class="text-red-500">{{ fieldHasError(field.name)() }}</span>
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
  mapper = inject(FormService);
  fieldsConfig = input.required<FieldConfig[]>();
  onSubmit = input.required<(value: any) => void>();

  formConfig = computed(() => this.mapper.toFormGroup(this.fieldsConfig()));

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
