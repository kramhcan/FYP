import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CoreService } from 'src/app/services/core.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hidepass = true;
  readonly ROOT_URL = 'http://localhost:3000/user/';
  loginForm: FormGroup;

  confirmPassword: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private coreService: CoreService,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onFirstSubmit() {
    if (this.loginForm.invalid) {
      return this.coreService.openSnackBar("Please fill all required fields", "Ok", "error");
    }
    this.userService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.coreService.openSnackBar(res.message, "Ok", "success");
        this.router.navigate(['/dashboard']);
      },
      (err: any) => {
        console.log(err);
        this.coreService.openSnackBar(err.message, "Ok", "error");
      }
    );
  }

}
