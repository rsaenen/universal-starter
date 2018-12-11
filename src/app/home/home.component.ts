import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const NODE_KEY = makeStateKey('nodekey');

@Component({
  selector: 'app-home',
  template: `<h3>I'm not using a route param</h3><pre>{{ res | json }}</pre>`
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
        .get('http://localhost:4000/api/events/201')
          .subscribe(data => {
            this.res = data;
            this.state.set(NODE_KEY, data as any);
          });
    }
  }
}
