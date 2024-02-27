import { FormControl, FormGroup } from "@angular/forms";

export interface Option {
  id: number;
  name: string;
  votes: number;
}

export namespace Option {
  export function formGroup(option?: Option) {
    return new FormGroup({
      id: new FormControl(option?.id ?? 0, { nonNullable: true }),
      name: new FormControl(option?.name ?? '', { nonNullable: true }),
      votes:  new FormControl(option?.id ?? 0, { nonNullable: true })
    })
  }
}
