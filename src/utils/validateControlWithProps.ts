import { FormGroup, AbstractControl } from '@angular/forms';

export const validateControlWithProps = (
  controlName: string,
  form: FormGroup,
  props: [keyof AbstractControl]
) => {
  const control = form.get(controlName);
  let isValid = true;
  props.forEach(prop => {
    isValid = isValid && control[prop];
  });
  return isValid;
};
