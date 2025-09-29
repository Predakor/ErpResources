import { Injectable, inject, input } from '@angular/core';
import { FieldConfig } from './form.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  builder = inject(FormBuilder);
  toFormGroup(configs: FieldConfig[]) {
    const group: any = {};
    configs.forEach((config) => {
      group[config.name] = config.required
        ? new FormControl(null, Validators.required)
        : new FormControl(null);
    });
    return new FormGroup(group);
  }
}
