import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Task } from 'src/app/models/task.model';

import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  listId: string;
  taskId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
    (params: Params) => {
      console.log(params);
        this.listId = params['listId'];
        this.taskId = params['taskId'];
      })
  }
  

  updateTask(title: string){
    if (title !== ''){
      this.taskService.updateTask(title, this.listId, this.taskId).subscribe((updatedTask:    Task) => {
      this.router.navigate(['/'], { relativeTo: this.route});
          }); 
    }
    else {
      
    }

  }

  deleteTask(){
      this.taskService.deleteTask(this.listId, this.taskId).subscribe(() => {
      this.router.navigate(['/'], { relativeTo: this.route});
          }); 
  }

}
