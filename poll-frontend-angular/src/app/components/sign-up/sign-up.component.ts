import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  userFormGroup = User.formGroup();

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.userFormGroup.valid)
      this.userService.save(this.userFormGroup.value).subscribe({
        next: () => this.router.navigateByUrl("/login")
      });
    else
      this.userFormGroup.markAllAsTouched();
  }

  onCancel() {
    this.router.navigateByUrl("/");
  }
}
