import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Option } from "./option.model";
import { User } from "./user.model";
import { MyValidators } from "../validators/forbidden-value.validator";

export interface Poll {
  id: number;
  name: string;
  options: Option[];
  creator: User;
}

export namespace Poll {
  export function formGroup(poll?: Poll) {
    return new FormGroup({
      id: new FormControl(poll?.id ?? 0, { nonNullable: true }),
      name: new FormControl(poll?.name ?? '', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), MyValidators.forbiddenValue('aurelien')] }),
      options: new FormArray(poll?.options.map(o => Option.formGroup(o)) ?? []),
      creator: new FormControl(poll?.creator, { nonNullable: true })
    })
  }
}
