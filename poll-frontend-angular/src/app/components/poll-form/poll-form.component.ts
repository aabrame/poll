import { Component, Inject } from '@angular/core';
import { Poll } from '../../models/poll.model';
import { FormArray } from '@angular/forms';
import { Option } from '../../models/option.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

export interface PollFormData {
  poll?: Poll;
  title: string;
  submitAction: (poll: Partial<Poll>) => Observable<void>
}

@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrl: './poll-form.component.css'
})
export class PollFormComponent {

  pollFormGroup = Poll.formGroup();

  constructor(
    public dialogRef: MatDialogRef<PollFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PollFormData
  ) {
    this.pollFormGroup = Poll.formGroup(data.poll);
  }


  get optionsFormArray() {
    return this.pollFormGroup.controls["options"] as FormArray<ReturnType<typeof Option.formGroup>>;
  }

  onAddOption() {
    this.optionsFormArray.controls.push(Option.formGroup());
  }

  onRemoveOption(i: number) {
    this.optionsFormArray.controls.splice(i, 1);
  }

  onSubmit() {
    this.data.submitAction(this.pollFormGroup.getRawValue()).subscribe(
      res => { console.log(res);  this.dialogRef.close(res); }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }

}
