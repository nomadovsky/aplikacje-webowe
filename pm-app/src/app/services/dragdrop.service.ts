import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/tasks/models/task';

@Injectable({
  providedIn: 'root'
})
export class DragDropStateService {
  private _tasks = new BehaviorSubject<Task[]>([]);
  public readonly tasks$ = this._tasks.asObservable();

  public get tasks(): Task[] {
    return this._tasks.getValue();
  }

  public set tasks(val: Task[]) {
    this._tasks.next(val);
  }
}
