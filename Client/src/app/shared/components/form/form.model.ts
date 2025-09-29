import { ValidatorFn } from '@angular/forms';

export type FieldType = 'text' | 'password' | 'email' | 'number' | 'date' | 'textarea';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  optional?: boolean;
  placeholder?: string;
  validator?: ValidatorFn;
}
