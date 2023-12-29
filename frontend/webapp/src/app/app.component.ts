import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private translateService: TranslateService,
    private breakpointObserver: BreakpointObserver
  ) { }

  expandMenu() {
    this.showMenu = !this.showMenu;
  }

  public selectLanguage(lang: any) {
    this.translateService.use(lang);
  }

  title = 'webapp';
}
