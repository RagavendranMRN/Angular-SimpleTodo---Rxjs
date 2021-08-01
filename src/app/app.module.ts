import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TaskListComponent } from './tasks/tasklist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from './TaskService.service';
@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, TaskListComponent],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {}
