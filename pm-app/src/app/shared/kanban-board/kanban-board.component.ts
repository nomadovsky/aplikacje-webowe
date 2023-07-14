import { Input, Component, OnChanges, OnInit, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Task } from 'src/app/tasks/models/task';
import { State } from '../enums/state.enum';
import { TaskService } from 'src/app/services/task.service';
import { KanbanItemDialogComponent } from './kanban-item-dialog/kanban-item-dialog.component';
import { DragDropStateService } from 'src/app/services/dragdrop.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent implements OnChanges, OnInit, OnDestroy {
  @Input() dataItems: Task[] = [];
  tasks: Task[] = [];
  tasksSubscription!: Subscription;

  columns = [
    {
      id: State.TODO,
      title: 'To Do',
      items: [] as Task[],
    },
    {
      id: State.DOING,
      title: 'In Progress',
      items: [] as Task[],
    },
    {
      id: State.DONE,
      title: 'Done',
      items: [] as Task[],
    },
  ];
  columnIds: string[] = Object.values(State);

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private dragDropStateService: DragDropStateService
  ) {}

  ngOnInit() {
    this.tasksSubscription = this.taskService
      .getAllTasks()
      .subscribe((tasks) => {
        this.tasks = tasks;
        this.assignColumns();
      });
  }

  ngOnDestroy() {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  ngOnChanges(): void {
    this.assignColumns();
  }

  assignColumns() {
    this.columns[0].items.length = 0;
    this.columns[1].items.length = 0;
    this.columns[2].items.length = 0;

    for (let task of this.tasks) {
      if (task.state === State.TODO) {
        this.columns[0].items.push(task);
      } else if (task.state === State.DOING) {
        this.columns[1].items.push(task);
      } else if (task.state === State.DONE) {
        this.columns[2].items.push(task);
      }
    }
  }

  deleteItem(item: Task): void {
    this.taskService.deleteTask(item.id);
  }

  editItem(item: Task): void {
    const dialogRef = this.dialog.open(KanbanItemDialogComponent, {
      width: '600px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.taskService.updateTask(item.id, result);
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const item: Task = event.item.data;
      const newState: State = this.getStateFromContainer(event.container.id);
      item.state = newState;
      this.taskService.updateTask(item.id, item);
    }
  }

  getStateFromContainer(containerId: string): State {
    switch (containerId) {
      case this.columns[0].id:
        return State.TODO;
      case this.columns[1].id:
        return State.DOING;
      case this.columns[2].id:
        return State.DONE;
      default:
        return State.TODO;
    }
  }
}
