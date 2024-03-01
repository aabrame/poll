import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';

import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { PollFormComponent } from './components/poll-form/poll-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { PollsComponent } from './components/polls/polls.component';
import { AuthenticationService } from './services/authentication.service';
import { authenticationInterceptor } from './interceptors/authentication.interceptor';
import { Polls2Component } from './components/polls2/polls2.component';
import { RunAwayDirective } from './directives/run-away.directive';
import { IsAnonymousDirective } from './directives/is-anonymous.directive';
import { IsCreatorOfDirective } from './directives/is-creator-of.directive';
import { InsertErrorsDirective } from './directives/insert-errors.directive';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { InsertError2Directive } from './directives/insert-error2.directive';

const materialImports = [
  MatToolbarModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatRadioModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatListModule,
];

@NgModule({
  declarations: [
    AppComponent,
    PollFormComponent,
    LoginComponent,
    PollsComponent,
    Polls2Component,
    RunAwayDirective,
    IsAnonymousDirective,
    IsCreatorOfDirective,
    InsertErrorsDirective,
    SignUpComponent,
    InsertError2Directive
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // HttpClientModule,
    ReactiveFormsModule,
    ...materialImports
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authenticationInterceptor])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: (as: AuthenticationService) => () => as.init(),
      deps: [AuthenticationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
