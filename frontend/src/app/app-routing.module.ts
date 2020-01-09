import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { TaskEditComponent } from './pages/task-edit/task-edit.component'
const routes: Routes = [
{ path: '', redirectTo: 'lists', pathMatch: 'full'},
{ path: 'new-list', component: NewListComponent}, { path: 'lists/:listId/new-task', component: NewTaskComponent}, { path: 'lists/:listId', component: TaskViewComponent}, { path: 'lists', component: TaskViewComponent}, { path: 'lists/:listId/tasks/:taskId', component: TaskEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
