import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { TasksState } from '../states/tasks.state';
import { Task } from '../tasks/models/task';
import { Priority } from '../shared/enums/priority.enum';
import { State } from '../shared/enums/state.enum';
import { Feature } from '../features/models/feature';
import { User } from '../users/models/user';
import { Observable, Subject, firstValueFrom, take } from 'rxjs';
import { FeaturesService } from './feature.service';
import { UsersService } from './user.service';

interface addTaskProps {
  taskName: string;
  description: string;
  priority: Priority;
  featureId: number;
  userId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService extends StateService<TasksState> {
  taskAdded$ = new Subject<Task>();
  taskStateChanged$ = new Subject<Task>();
  taskChanged$ = new Subject<Task>();

  constructor() {
    super({ tasks: [] });
  }

  getAllTasks(): Observable<Task[]> {
    return this.select((state) => state.tasks);
  }

  getTasksOfFeature(featureId: number): Task[] {
    const currentTasks = this.getState().tasks;
    return currentTasks.filter((task) => task.featureId === featureId);
  }

  addTask({
    taskName,
    description,
    featureId,
    priority,
    userId,
  }: addTaskProps): void {
    const currentTasks = this.getState().tasks;
    const newTask = new Task(
      currentTasks.length + 1,
      taskName,
      description,
      priority,
      featureId,
      State.TODO,
      0
    );
    console.log({ tasks: [...currentTasks, newTask] });
    console.log('new task', newTask);
    this.setState({ tasks: [...currentTasks, newTask] });
    this.taskAdded$.next(newTask);
  }

  setTasks(tasks: Task[]) {
    this.setState({ tasks });
  }

  deleteTask(id: number): void {
    const currentTasks = this.getState().tasks;
    const updatedTasks = currentTasks.filter((task) => task.id !== id);
    this.setTasks(updatedTasks);
  }

  updateTask(id: number, updatedTask: any): void {
    const currentTasks = this.getState().tasks;
    const currentTask = { ...updatedTask, id };
    const taskIndex = currentTasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      console.log(currentTasks[taskIndex]);
      console.log(updatedTask);
      currentTasks[taskIndex] = currentTask;
      this.setTasks(currentTasks);
    }
    this.taskStateChanged$.next(currentTask);
    this.taskChanged$.next(currentTask);
  }
}
