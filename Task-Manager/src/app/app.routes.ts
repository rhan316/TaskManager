import {provideRouter, RouterModule, Routes} from '@angular/router';
import {TaskListComponent} from "./components/task-list/task-list.component";
import {TaskDetailsComponent} from "./components/task-details/task-details.component";
import {AddTaskComponent} from "./components/add-task/add-task.component";

export const routes: Routes = [
  {path: '', redirectTo: 'tasks', pathMatch: 'full'},
  {path: 'tasks', component: TaskListComponent},
  {path: 'tasks/:id', component: TaskDetailsComponent},
  {path: 'add', component: AddTaskComponent}
];
export const AppRoutingModule = {
  providers: [provideRouter(routes)]
}
