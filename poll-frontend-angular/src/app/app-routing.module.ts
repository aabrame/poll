import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PollsComponent } from './components/polls/polls.component';
import { Polls2Component } from './components/polls2/polls2.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'polls2', component: Polls2Component },
  { path: '', component: PollsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
