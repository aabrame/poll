import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, startWith, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs';
import { Poll } from '../../models/poll.model';
import { PollService } from '../../services/poll.service';
import { PollFormComponent } from '../poll-form/poll-form.component';
import { Option } from '../../models/option.model';

@Component({
  selector: 'app-polls2',
  templateUrl: './polls2.component.html',
  styleUrl: './polls2.component.css'
})
export class Polls2Component {

  polls?: Poll[];

  filter = new FormControl('', { nonNullable: true });

  constructor(
    private pollService: PollService,
    private dialogService: MatDialog
  ) {
    this.filter.valueChanges.pipe(
      startWith(''),
      debounceTime(333),
      distinctUntilChanged(),
      mergeMap(q => this.pollService.findAll(q))
    ).subscribe(polls => this.polls = polls)
  }

  onFilter() {
    this.pollService.findAll(this.filter.value).subscribe(polls => this.polls = polls);
  }

  onAdd() {
    this.dialogService.open(
      PollFormComponent,
      {
        data: {
          title: "New poll",
          submitAction: (poll: Poll) => this.pollService.save(poll)
        },
        width: "1024px",
        maxHeight: "80vh"
      }
    ).afterClosed().subscribe(
      p => {
      });
  }

  onEdit(event: Event, poll: Poll) {
    event.stopPropagation();
    this.dialogService.open(
      PollFormComponent,
      {
        data: {
          title: "Edit poll " + poll.id,
          poll: poll,
          submitAction: (poll: Poll) => this.pollService.update(poll)
        },
        width: "1024px",
        maxHeight: "80vh"
      }
    ).afterClosed().subscribe(
      p => {
      });
  }

  onDelete(event: Event, poll: Poll) {
    event.stopPropagation();
    this.pollService.deleteById(poll.id).subscribe({
      next: (val) => console.log(val),
      error: err => console.log(err)
  });
  }

  percentage(p: Poll, o: Option) {
    const total = p.options.map(o => o.votes).reduce((s, v) => s+v);
    return total === 0
      ? 'no votes'
      : 100*o.votes/total + "%";
  }
}
