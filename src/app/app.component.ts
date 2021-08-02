import { Component, VERSION, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TaskService } from './TaskService.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  buttons: any = [
    {
      id: '#628395',
      name: 'Primary'
    },
    {
      id: '#262A53',
      name: 'Important'
    },
    {
      id: '#FFA0A0',
      name: 'Plans'
    },
    {
      id: '#FFE3E3',
      name: 'Misc'
    }
  ];
  tasks: any = [];
  Filteredtasks: any = [];
  newTask: any;
  filterBy: String = 'Primary';
  ColorPicker: FormGroup;

  constructor(private taskSer: TaskService) {}

  ngOnInit() {
    console.log(window.innerWidth <= 800 && window.innerHeight <= 600);
    let name = new FormControl('', Validators.required);
    let colorcode = new FormControl('', Validators.required);
    this.ColorPicker = new FormGroup({
      name: name,
      colorcode: colorcode
    });
    this.taskSer.rangeObs.subscribe(res => {
      this.tasks = res;
      this.Filteredtasks = this.taskSer.dataStream.filter(
        v => v.tags === this.filterBy
      );
    });
  }

  _handleTaskListCss() {
    if (window.innerWidth <= 800 && window.innerHeight <= 600) {
      return 'btn-group';
    }
    return 'btn-group-vertical';
  }
  // prio 1-High,2- Medium, 3 - Low
  _handleTaskAdd() {
    if (this.newTask) {
      let Taskobj = {
        id: this.tasks.length,
        task: this.newTask,
        desc: '',
        date: '',
        prio: '',
        isCompleted: false,
        tags: this.filterBy
      };
      this.taskSer.rangeValueChange(Taskobj);
      // this.tasks.push(Taskobj);
      // this._handleFilter(this.filterBy);
      this.newTask = null;
    }
  }
  _handleDeleteTask = value => {
    this.taskSer.rangeValueDelete(value);
  };
  _handleCompletedTask = value => {
    let index = this.tasks.findIndex(v => v.id == value);
    this.tasks[index].isCompleted =
      this.tasks[index].isCompleted === false ? true : false;
    this._handleFilter(this.filterBy);
  };

  _handleFilter = filterz => {
    // this.filterBy = filterz;

    // this.Filteredtasks = this.taskSer.dataStream.filter(
    //   v => v.tags === filterz
    // );

    // console.log(this.Filteredtasks);
    this.taskSer.filterChange(filterz);
  };

  // _handleFilter = filter => {
  //   this.filterBy = filter;
  //   this.Filteredtasks = this.tasks.filter(v => v.tags === filter);

  //   this.Filteredtasks = this.Filteredtasks.sort(
  //     (x, y) => Number(x.isCompleted) - Number(y.isCompleted)
  //   );
  // };

  _handlePriortiyTask = ChangedPrio => {
    let index = this.tasks.findIndex(v => v.id == ChangedPrio.id);
    this.tasks[index].prio = ChangedPrio.prio;
    this._handleFilter(this.filterBy);
  };
  _handleTagListCreation = () => {
    if (this.ColorPicker.valid) {
      this.buttons.push({
        id: this.ColorPicker.value.colorcode,
        name: this.ColorPicker.value.name
      });
    }
    this.ColorPicker.reset();
  };

  _handleDeleteList(id) {
    this.buttons = this.buttons.filter(v => v.id !== id);
  }
}
