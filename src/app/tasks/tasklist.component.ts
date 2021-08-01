import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'task-list',
  templateUrl: '../tasks/tasklist.component.html',
  styles: [
    `
      .floatRt {
        float: right;
      }
    `
  ]
})
export class TaskListComponent {
  @Input() values;
  @Output() liftValue = new EventEmitter();
  @Output() liftDelValue = new EventEmitter();
  @Output() liftPrio = new EventEmitter();

  completed: false;

  getClasses(completed) {
    if (completed === false) {
      return 'icon-circle-blank';
    }
    return 'icon-circle';
  }

  getPrio(prio) {
    if (prio === 1) return 'text-danger';
    else if (prio === 2) return 'text-warning';
    else if (prio == 3) return 'text-success';
  }
  _handleDelete(value) {
    this.liftValue.emit(value);
  }
  _handleCompleted(value) {
    this.liftDelValue.emit(value);
  }
  _handlePrio(t, value) {
    let obj = {
      id: t.id,
      prio: value
    };
    this.liftPrio.emit(obj);
  }
}
