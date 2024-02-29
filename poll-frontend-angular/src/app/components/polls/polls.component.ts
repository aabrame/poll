import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Poll } from '../../models/poll.model';
import { PollService } from '../../services/poll.service';
import { PollFormComponent } from '../poll-form/poll-form.component';
import { Option } from '../../models/option.model';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrl: './polls.component.css'
})
export class PollsComponent {

  polls$: Observable<Poll[]>;

  constructor(
    private pollService: PollService,
    private dialogService: MatDialog
  ) {
    this.polls$ = pollService.findAll();
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
        console.log(p);
        if (p)
          this.polls$ = this.pollService.findAll();
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
        if (p)
          this.polls$ = this.pollService.findAll();
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
