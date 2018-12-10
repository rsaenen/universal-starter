import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const NODE_KEY = makeStateKey('nodekey');

@Component({
  selector: 'app-home',
  template: `<h3>I'm using node api endpoint</h3><pre>{{ res | json }}</pre>`
})
export class HomeComponent implements OnInit {
  public res;

  constructor(
    private http: HttpClient,
    private state: TransferState
  ) { }

  public ngOnInit(): void {
    this.res = this.state.get(NODE_KEY, null as any);

    if (!this.res) {
      this.http
      // .get('https://angular-universal-course-ebcc3.firebaseio.com/courses/01.json') is working
      .get('/api/courses/01.json')
        .subscribe(data => {
          this.res = data;
          this.state.set(NODE_KEY, data as any);
        });
    }
  }
}
