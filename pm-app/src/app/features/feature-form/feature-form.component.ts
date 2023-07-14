import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FeaturesService } from 'src/app/services/feature.service';
import { TaskService } from 'src/app/services/task.service';
import { UsersService } from 'src/app/services/user.service';
import { Task } from 'src/app/tasks/models/task';
import { User } from 'src/app/users/models/user';

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss'],
})
export class FeatureFormComponent implements OnInit {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  featureForm!: FormGroup;
  tasks: Task[] = [];
  users: User[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private featuresService: FeaturesService,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<FeatureFormComponent>
  ) {}

  ngOnInit(): void {
    this.featureForm = new FormGroup({
      featureName: new FormControl('', Validators.required),
      description: new FormControl(''),
      priority: new FormControl('', Validators.required),
      ownerId: new FormControl(null),
    });
    this.taskService.getAllTasks().subscribe((tasks) => (this.tasks = tasks));
    this.usersService.getAllUsers().subscribe((users) => (this.users = users));
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.featureForm.valid) {
      console.log('value featureForm', this.featureForm.value);
      this.featuresService.addFeature(this.featureForm.value);
      this.formSubmit.emit(this.featureForm.value);
      this.dialogRef.close();
    } else {
      console.error('Form is not valid');
    }
  }
}
