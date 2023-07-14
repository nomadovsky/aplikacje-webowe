import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from './task-form/task-form.component';
import { Priority } from '../shared/enums/priority.enum';
import { Feature } from '../features/models/feature';
import { Project } from '../projects/models/project';
import { User } from '../users/models/user';
import { State } from '../shared/enums/state.enum';
import { Task } from '../tasks/models/task';
import { TaskService } from '../services/task.service';
import { FeaturesService } from '../services/feature.service';
import { UsersService } from '../services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  features: Feature[] = [];
  users: User[] = [];

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private featureService: FeaturesService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.taskService
      .select((state) => state.tasks)
      .subscribe((tasks) => {
        this.tasks = tasks;
      });

    this.featureService.getAllFeatures().subscribe((features) => {
      this.features = features;
    });
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '60%',
      data: {
        name: '',
        description: '',
        priority: '',
        feature: '',
        user: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
