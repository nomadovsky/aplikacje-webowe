import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Feature } from 'src/app/features/models/feature';
import { Project } from 'src/app/projects/models/project';
import { FeaturesService } from 'src/app/services/feature.service';
import { TaskService } from 'src/app/services/task.service';
import { UsersService } from 'src/app/services/user.service';
import { Priority } from 'src/app/shared/enums/priority.enum';
import { State } from 'src/app/shared/enums/state.enum';
import { User } from 'src/app/users/models/user';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  taskForm!: FormGroup;
  features: Feature[] = [];
  users: User[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskservice: TaskService,
    private featuresService: FeaturesService,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<TaskFormComponent>
  ) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      taskName: new FormControl('', Validators.required),
      description: new FormControl(''),
      priority: new FormControl('', Validators.required),
      featureId: new FormControl(null, Validators.required),
      user: new FormControl(null),
    });
    this.featuresService
      .getAllFeatures()
      .subscribe((features) => (this.features = features));
    this.usersService.getAllUsers().subscribe((users) => (this.users = users));
  }

  closeDialog() {
    return this.dialogRef.close();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('submit');
      this.taskservice.addTask(this.taskForm.value);
      this.formSubmit.emit(this.taskForm.value);
      this.dialogRef.close();
    } else {
      console.error('Form is not valid');
    }
  }
}
