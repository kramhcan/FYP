import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  showMenu = true;
  isLoggedIn = false;
  user: string | null = null;

  ngOnInit() {
    this.userService.getUser().subscribe(
      (res: string | null) => {
        // console.log(res);
        this.user = res;
        if (this.user && this.user.length > 0) {
          this.isLoggedIn = true;
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  constructor(
    private translateService: TranslateService,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService
  ) { }

  expandMenu() {
    this.showMenu = !this.showMenu;
  }

  public selectLanguage(lang: any) {
    this.translateService.use(lang);
  }

  title = 'webapp';

  testUser() {
    console.log("Test user: " + this.isLoggedIn);
    console.log("Test user: " + JSON.stringify(this.user));
  }

  logout() {
    this.userService.logout();
  }
}
