import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>Universal Demo using Angular and Angular CLI</h1>
  <a routerLink="/">Component without route param</a>
  <a routerLink="/home-param/01">Component with route param</a>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {

}
