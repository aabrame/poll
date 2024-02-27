import { Component } from '@angular/core';
import { PollService } from './services/poll.service';
import { Observable, filter, map } from 'rxjs';
import { Poll } from './models/poll.model';
import { Option } from './models/option.model';
import { MatDialog } from '@angular/material/dialog';
import { PollFormComponent } from './components/poll-form/poll-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

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
    this.pollService.deleteById(poll.id).subscribe(
      () => this.polls$ = this.polls$.pipe(map(polls => polls.filter(p => p.id !== poll.id)))
    );
  }

  percentage(p: Poll, o: Option) {
    const total = p.options.map(o => o.votes).reduce((s, v) => s+v);
    return total === 0
      ? 'no votes'
      : 100*o.votes/total + "%";
  }
}
