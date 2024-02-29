import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Option } from "./option.model";
import { User } from "./user.model";

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
      name: new FormControl(poll?.name ?? '', { nonNullable: true }),
      options: new FormArray(poll?.options.map(o => Option.formGroup(o)) ?? []),
      creator: new FormControl(poll?.creator, { nonNullable: true })
    })
  }
}
