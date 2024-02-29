import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = new FormGroup({
    email: new FormControl('', {nonNullable: true, validators: [ Validators.required ]}),
    password: new FormControl('', {nonNullable: true, validators: [ Validators.required ]})
  });
  error = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {}

  onSubmit() {
    this.authenticationService.login(
      this.credentials.value.email!,
      this.credentials.value.password!).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: err => {
          this.error = err.message;
          console.log(err);
        }
      });
  }

}
