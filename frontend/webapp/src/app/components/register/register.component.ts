import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { ApiService } from 'src/app/services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide = true;
  readonly ROOT_URL = 'http://localhost:3000/user/';
  registerForm: FormGroup;

  confirmPassword: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private coreService: CoreService
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

    const formValue = this.registerForm.value;
    
    if (formValue.password != this.confirmPassword) {
      return this.coreService.openSnackBar("Password and confirmation password must be the same", "Ok", "error");
    }
    this.hide = false;
    console.log(this.registerForm.value);
  }

}
