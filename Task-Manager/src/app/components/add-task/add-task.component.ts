import { Component } from '@angular/core';
import {Task} from "../../Task";
import {TaskService} from "../../services/task.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  task: Task = {
    title: '',
    description: '',
    created_at: new Date(),
  }

  submitted = false;

  constructor(private taskService: TaskService) {}

  saveTask(): void {
    const data = {
      title: this.task.title,
      description: this.task.description
    }
    this.taskService.addTask(data).subscribe({
      next: res => {
        console.log(res);
        this.submitted = true;
      },
      error: e => {
        console.log("Error: ", e);
      }
    })
  };

  newTask(): void {
    this.submitted = false;
    this.task = {
      title: '',
      description: '',
      created_at: new Date()
    }
  };
}
