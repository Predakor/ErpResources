export default {
  withPattern: (pattern: RegExp) => {
    return (value: string) => {
      return pattern.test(value)
        ? null
        : { invalidPattern: `Must match following pattern ${pattern}` };
    };
  },

  hasLength: (length: number) => {
    return (value: string) => {
      return value.length === length ? null : { length: `Must be ${length} characters long` };
    };
  },

  hasMinLength: (minLength: number) => {
    return (value: string) => {
      return value.length >= minLength
        ? null
        : { minLength: `Must be atleast ${minLength} characters long` };
    };
  },

  hasMaxLength: (maxLength: number) => {
    return (value: string) => {
      return value.length <= maxLength
        ? null
        : { maxLength: `Must contain less than ${maxLength} characters` };
    };
  },

  hasUpperCase: (value: string) => {
    return /[A-Z]/.test(value ?? '')
      ? null
      : { uppercase: 'Must contain at least one uppercase letter' };
  },

  hasLowerCase: (value: string) => {
    return /[a-z]/.test(value ?? '')
      ? null
      : { lowercase: 'Must contain at least one lowercase letter' };
  },

  hasNumber: (value: string) => {
    return /[0-9]/.test(value ?? '') ? null : { number: 'Must contain at least one number' };
  },

  hasSpecial: (value: string) => {
    return /[!@#$%^&*(),.?":{}|<>]/.test(value ?? '')
      ? null
      : { special: 'Must contain at least one special character' };
  },

  notNull: (value: string | null | undefined) => {
    return !!value ? null : { notNull: 'Must not be empty or null' };
  },
};
