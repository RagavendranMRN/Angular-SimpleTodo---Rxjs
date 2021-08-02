import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class TaskService {
  rangeObserver;
  rangeObs;

  filterObs;
  filterObserver;

  dataStream: any = [];

  constructor() {
    this.rangeObs = new Observable(observer => {
      this.rangeObserver = observer;
    }).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

    this.filterObs = new Observable(observer => {
      this.filterObserver = observer;
    });
  }

  filterChange(filterValue) {
    this.filterObserver.next(
      this.dataStream.filter(v => v.tags === filterValue)
    );
  }
  rangeValueChange(data) {
    this.dataStream.push(data);
    this.rangeObserver.next(this.dataStream);
  }

  rangeValueDelete(value) {
    this.dataStream = this.dataStream.filter(v => v !== value);
    this.rangeObserver.next(this.dataStream);
  }
}
