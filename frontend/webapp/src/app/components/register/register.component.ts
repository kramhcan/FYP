import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { ApiService } from 'src/app/services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide = true;

  hidepass = true;
  readonly ROOT_URL = 'http://localhost:3000/user/';
  registerForm: FormGroup;

  confirmPassword: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private coreService: CoreService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: '',
      dob: '',
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: '',
      role: ''
    });
  }

  onFirstSubmit(passwordC: string) {
    this.confirmPassword =  passwordC;
    console.log("Confirmation input: " + this.confirmPassword);

    if (this.registerForm.invalid) {
      return this.coreService.openSnackBar("Please fill all required fields", "Ok", "error");
    }

    const formValue = this.registerForm.value;
    
    if (formValue.password != this.confirmPassword) {
      return this.coreService.openSnackBar("Password and confirmation password must be the same", "Ok", "error");
    }
    this.hide = false;
    console.log(this.registerForm.value);
  }

  onSecondSubmit() {
    console.log(this.registerForm.value);
    this.apiService.post(this.ROOT_URL + 'register', this.registerForm.value).subscribe(
      res => {
        console.log(res);
        this.coreService.openSnackBar(res.message, "Ok", "success");
        this.router.navigate(['/dashboard']);
      },
      err => {
        console.log(err);
        this.coreService.openSnackBar(err.message, "Ok", "error");
      }
    );
  }
}
