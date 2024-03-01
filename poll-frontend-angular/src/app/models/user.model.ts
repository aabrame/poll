import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { MyValidators } from "../validators/forbidden-value.validator";
import { Poll } from "./poll.model";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  polls: Poll[];
}

export namespace User {
  export function formGroup(user?: User) {
    return new FormGroup({
      id: new FormControl(user?.id ?? 0, { nonNullable: true }),
      name: new FormControl(user?.name ?? '', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), MyValidators.forbiddenValue('aurelien')] }),
      email: new FormControl(user?.email ?? '', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl(user?.password ?? '', { nonNullable: true, validators: [Validators.required] }),
      polls: new FormControl(user?.polls ?? [], { nonNullable: true })
    })
  }
}
