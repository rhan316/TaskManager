import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent implements OnInit {
  isOpen = false;
  taskIdToDelete: number | null = null;
  constructor(private taskService: TaskService) {}

  ngOnInit() {

  }

  deleteTask() {
    if (this.taskIdToDelete !== null) {
      this.taskService.deleteTask(this.taskIdToDelete).subscribe({
        next: () => {
          this.closeModal();
        },
        error: (e) => {
          console.log("Error deleting task:", e);
        }
      });
    }
  }

  closeModal() {
    this.isOpen = false;
    this.taskIdToDelete = null;
  }
}
