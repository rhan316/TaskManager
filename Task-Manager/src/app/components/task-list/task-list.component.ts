import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {format, parseISO} from "date-fns";
import {BsModalRef, BsModalService, ModalModule} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ModalModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  currentTask: Task = {};
  currentModalTask?: Task;
  currentIndex = -1;
  title = '';
  private tasksSubscription: Subscription;
  modalRef?: BsModalRef;

  constructor(private taskService: TaskService, private modalService: BsModalService) {
    this.tasksSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.tasksSubscription = this.taskService.tasks$.subscribe({
      next: (data) => {
        this.tasks = data;
        console.log(data);
      },
      error: (err) => console.log(err)
    });
  }

  ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  deleteTask() {
    if (this.currentModalTask?.id) {
      this.taskService.deleteTask(this.currentModalTask.id).subscribe(() => {
        this.modalRef?.hide();
        this.currentModalTask = {};
      })
    }
  }

  setActiveTask(task: Task, index: number) {
    this.currentTask = task;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.currentTask = {};
    this.currentIndex = -1;

    this.taskService.findByTitle(this.title).subscribe({
      next: (data) => {
        console.log('Search results:', data);
      },
      error: (e) => console.log(e)
    })
  }

  formatDate(date?: Date): string {
    if (!date) return '';

    const parsedDate = parseISO(date.toString());
    return format(parsedDate, "HH:mm dd-MM-yyyy");
  }

  openModal(template: TemplateRef<any>, task: Task) {
    this.currentModalTask = task;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
}
