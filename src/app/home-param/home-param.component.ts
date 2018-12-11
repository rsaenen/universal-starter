import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const NODE_KEY = makeStateKey('nodekeyparam');

@Component({
  selector: 'app-home',
  template: `<h3>I'm using a route param</h3><pre>{{ res | json }}</pre>`
})
export class HomeParamComponent implements OnInit {
  public res;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private state: TransferState
  ) { }

  public ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.res = this.state.get(NODE_KEY, null as any);

    if (!this.res) {
      this.http
        .get(`http://localhost:4000/api/events/${id}`)
        .subscribe(data => {
          this.res = data;
          this.state.set(NODE_KEY, data as any);
        });
    }
  }
}
