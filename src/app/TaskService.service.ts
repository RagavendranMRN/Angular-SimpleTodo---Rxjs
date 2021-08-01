import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {
  rangeObserver;
  rangeObs;

  dataStream:Array<String>;

  constructor() {
    this.rangeObs = new Observable(observer => {
      this.rangeObserver = observer;
    });
    this.rangeObs.subscribe(res => this.dataStream.push(res));
  }

  rangeValueChange(data) {
    this.rangeObserver.next(data);
  }
}
