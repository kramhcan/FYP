import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private userService: UserService) { }

  user: any = null;
  userDataConv: any = null;
  userData: any = null;
  hasData = false;

  ngOnInit() {
    this.userService.getUser().subscribe(
      (res: string | null) => {
        // console.log(res);
        if (res !== null) {
          this.user = JSON.parse(res);
        }
      },
      (err: any) => {
        console.log(err);
      }
    );

    this.userService.getUserData().subscribe(
      (res: string | null) => {
        // console.log(res);
        if (res !== null) {
          this.userDataConv = JSON.parse(res);
          if (this.userDataConv.body.userData !== null && this.userDataConv.body.userData.length > 0) {
            // console.log(this.userDataConv.body.userData);
            this.hasData = true;
            this.userData = this.userDataConv.body.userData[0].user_data;
          }
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}