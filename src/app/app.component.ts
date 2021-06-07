import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, first } from "rxjs/operators";

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LawTally';
  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        window.scrollTo({
          top: 0,
          left: 0,
        });
      });
  }
  onActivate(event) {
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
   
}
}
