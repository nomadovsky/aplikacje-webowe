import { Component, OnInit } from '@angular/core';
import { Feature } from './models/feature';
import { FeaturesService } from '../services/feature.service';
import { TaskService } from '../services/task.service';
import { Task } from '../tasks/models/task';
import { FeatureFormComponent } from './feature-form/feature-form.component';
import { MatDialog } from '@angular/material/dialog';
import { FeatureEditFormComponent } from './feature-edit-form/feature-edit-form.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  features: Feature[] = [];

  constructor(
    public dialog: MatDialog,
    private featureService: FeaturesService,
    private taskService: TaskService
  ) {}

  tasks: Task[] = [];

  ngOnInit(): void {
    this.featureService.getAllFeatures().subscribe((features) => {
      this.features = features;
    });

    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  getTask(taskId: number): Task | undefined {
    const task = this.tasks.find((task) => task.id === taskId);
    return task;
  }

  getFeature(featureId: number): Feature | undefined {
    const feature = this.features.find((feature) => feature.id === featureId);
    return feature;
  }

  deleteFeature(id: number): void {
    this.featureService.deleteFeature(id);
  }

  editFeature(featureId: number): void {
    const feature = this.getFeature(featureId);
    const dialogRef = this.dialog.open(FeatureEditFormComponent, {
      width: '600px',
      data: feature,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.featureService.updateFeature(featureId, result);
        const updatedFeatureIndex = this.features.findIndex(
          (feature) => feature.id === featureId
        );
        if (updatedFeatureIndex !== -1) {
          this.features[updatedFeatureIndex] = result;
        }
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FeatureFormComponent, {
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
