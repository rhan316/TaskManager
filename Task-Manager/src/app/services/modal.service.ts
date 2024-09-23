import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {TaskService} from "./task.service";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalSubject: Subject<number>;
  constructor(private taskService: TaskService) {
    this.modalSubject = new Subject<number>();
  }

  openModal(taskId: number) {
    this.modalSubject.next(taskId);
    this.taskService.deleteTask(taskId);
  }

  getModalOpenObservable() {
    return this.modalSubject.asObservable();
  }

}
