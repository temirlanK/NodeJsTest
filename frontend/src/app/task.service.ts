import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  createList(title: string){
      return this.webReqService.post("lists", {title});
  }

  createTask(title: string, listId: string){
      return this.webReqService.post(`lists/${listId}/tasks`, {title});
  }

  updateTask(title: string, listId: string, taskId: string){
      return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, {title});
  }

  deleteTask(listId: string, taskId: string){
      return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  getLists(){
    return this.webReqService.get('lists');
  }

  getTasks(listId: string){
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
}
