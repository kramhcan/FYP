import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CoreService } from 'src/app/services/core.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrl: './predict.component.scss'
})

export class PredictComponent implements OnInit {
  predictForm: FormGroup;
  private readonly ROOT_URL = 'http://localhost:3000/';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private apiService: ApiService,
    private core: CoreService,
    private router: Router
    ) {
    this.predictForm = this.formBuilder.group({
      email : null,
      age: ['', Validators.required],
      gender: ['', Validators.required],
      chest_pain_type: ['', Validators.required],
      colored_vessels_count: ['', Validators.required],
      exercise_angina: ['', Validators.required],
      oldpeak: ['', Validators.required],
      slope: ['', Validators.required],
      thal: ['', Validators.required],
      thalach: ['', Validators.required]
    });
  }

  userDataConv: any = null;
  hasData = false;
  userData: any = null;

  ngOnInit() {
    // Placeholder code to set default values from localStorage
    this.userService.getUserData().subscribe(
      (res: string | null) => {
        // console.log(res);
        if (res !== null) {
          this.userDataConv = JSON.parse(res);
          if (this.userDataConv.body.userData !== null && this.userDataConv.body.userData.length > 0) {
            console.log(this.userDataConv.body.userData);
            this.hasData = true;
            this.userData = this.userDataConv.body.userData[0].user_data;
            this.predictForm.patchValue(this.userData); // Patch userData into the form group
            this.predictForm.get('chest_pain_type')?.setValue(String(this.userData.chest_pain_type));
            this.predictForm.get('exercise_angina')?.setValue(String(this.userData.exercise_angina));
            this.predictForm.get('colored_vessels_count')?.setValue(String(this.userData.colored_vessels_count));
            this.predictForm.get('slope')?.setValue(String(this.userData.slope));
            this.predictForm.get('thal')?.setValue(String(this.userData.thal));
            this.predictForm.get('email')?.setValue(String(this.userDataConv.body.userData[0].email));
          }
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  submitForm() {
    console.log(this.predictForm.value);
    this.predict();
  }

  predict() {
    // console.log(this.predictForm.value);
    return this.apiService.get(this.ROOT_URL + 'user_data/predict/' + this.userDataConv.body.userData[0].email, this.predictForm.value).subscribe(
      res => {
        console.log(res.body.response[0]);
        localStorage.setItem('prediction', JSON.stringify(res.body.response[0]));
        this.core.openSnackBar('Prediction: ' + res.body.response[0][1].toFixed(3) * 100 + '% chance of contracting heart disease.', 'Ok', 'Info');
        this.updateOrInsert();
      },
      err => {
        console.log(err);
      }
    );
  }

  updateOrInsert() {
    if(this.hasData) {
      // console.log("updateOrInsert: " + JSON.stringify(this.userDataConv.body.userData[0].user_data._id));
      this.update();
    } else {
      this.insert();
    }
  }

  update() {
    this.apiService.put(this.ROOT_URL + 'user_data/update/' + this.userDataConv.body.userData[0].user_data._id, this.predictForm.value).subscribe(
      res => {
        console.log(res);
        // this.core.openSnackBar('Updated', 'Ok', 'success');
        this.userService.updateLocalUserData(this.userDataConv.body.userData[0].email);
      },
      err => {
        console.log(err);
      }
    );
  }

  insert() {
    this.apiService.post(this.ROOT_URL + 'user_data/insert/', this.predictForm.value).subscribe(
      res => {
        console.log(res);
        this.core.openSnackBar('Inserted', 'Ok', 'success');
        this.userService.updateLocalUserData(this.userDataConv.body.userData[0].email);
      },
      err => {
        console.log(err);
      }
    );
  }

}

