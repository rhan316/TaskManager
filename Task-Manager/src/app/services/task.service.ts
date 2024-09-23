import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Task} from "../Task";


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private readonly baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.http.get<Task[]>(this.baseUrl).subscribe(
      tasks => this.tasksSubject.next(tasks)
    );
  }

  getAll(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task).pipe(
      tap(newTask => {
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next([...currentTasks, newTask]);
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap( () => {
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next(currentTasks.filter(task => task.id != id));
        }
      )
    );
  }


  get(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`).pipe(
      tap(fetchedTask => {
          const currentTasks = this.tasksSubject.value;
          const taskIndex = currentTasks.findIndex(task => task.id === id);

          if (taskIndex !== -1) {
            currentTasks[taskIndex] = fetchedTask;
          } else {
            currentTasks.push(fetchedTask);
          }

          this.tasksSubject.next([...currentTasks])
      })
    )
  }

  update(id: number, data: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, data).pipe(
      tap(updatedTask => {
          const currentTasks = this.tasksSubject.value;
          const index = currentTasks.findIndex(task => task.id === id);

          if (index !== -1) {
            currentTasks[index] = updatedTask;
            this.tasksSubject.next([...currentTasks]);
          }
      })
    );
  }


  findByTitle(title: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}?title=${title}`).pipe(
      tap(tasks => this.tasksSubject.next(tasks)
      )
    );
  }
}
