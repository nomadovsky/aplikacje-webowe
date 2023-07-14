import { Injectable, Injector } from '@angular/core';
import { StateService } from './state.service';
import { FeaturesState } from '../states/features.state';
import { State } from '../shared/enums/state.enum';
import { Feature } from '../features/models/feature';
import { Priority } from '../shared/enums/priority.enum';
import { UsersService } from './user.service';
import { ProjectsService } from './project.service';
import { Subject, firstValueFrom, take } from 'rxjs';
import { Task } from '../tasks/models/task';
import { TaskService } from './task.service';

interface addFeatureProps {
  featureName: string;
  description: string;
  priority: Priority;
  featureId: number;
  ownerId: number;
  projectId: number;
  taskIds: number[];
}

@Injectable({ providedIn: 'root' })
export class FeaturesService extends StateService<FeaturesState> {
  featureAdded$ = new Subject<Feature>();

  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService,
    private tasksService: TaskService
  ) {
    super({ features: [] });
    this.subscribeToTaskAddedEvent();
    this.subscribeToTaskChangedEvent();
    this.subscribeToTaskStateChangedEvent();

    this.fetchData();
  }

  private async fetchData() {
    const users$ = this.usersService.getAllUsers().pipe(take(1));
    const projects$ = this.projectsService.getAllProjects().pipe(take(1));

    try {
      const users = await firstValueFrom(users$);
      const projects = await firstValueFrom(projects$);

      const feature = new Feature(
        0,
        'Feature 1',
        'Description of feature 1',
        Priority.HIGH,
        projects[0].id,
        users[0].id,
        State.TODO,
        []
      );
      this.setState({ features: [feature] });
    } catch (err) {
      console.error('Error loading data from Observables:', err);
    }
  }

  addFeature({
    featureName,
    description,
    priority,
    ownerId,
  }: addFeatureProps): void {
    const currentFeatures = this.getState().features;
    console.log();
    const newFeature = new Feature(
      currentFeatures.length + 1,
      featureName,
      description,
      priority,
      0,
      ownerId,
      State.TODO,
      []
    );
    console.log({ features: [...currentFeatures, newFeature] });
    this.setState({ features: [...currentFeatures, newFeature] });
    this.featureAdded$.next(newFeature);
  }

  getAllFeatures() {
    return this.select((state) => state.features);
  }

  deleteFeature(id: number): void {
    const currentFeatures = this.getState().features;
    const featureToDelete = currentFeatures.find(
      (feature) => feature.id === id
    );
    if (featureToDelete) {
      featureToDelete.taskIds.forEach((taskId) =>
        this.tasksService.deleteTask(taskId)
      );
    }
    const updatedFeatures = currentFeatures.filter(
      (feature) => feature.id !== id
    );
    this.setState({ features: updatedFeatures });
  }

  private subscribeToTaskAddedEvent(): void {
    this.tasksService.taskAdded$.subscribe((task) => {
      const currentFeatures = this.getState().features;

      const feature = currentFeatures.find((f) => f.id === task.featureId);
      if (!feature) {
        console.error('Feature not found for the new task:', task);
        return;
      }
      feature.taskIds.push(task.id);
      this.setState({ features: currentFeatures });
    });
  }
  private subscribeToTaskChangedEvent(): void {
    this.tasksService.taskChanged$.subscribe((updatedTask) => {
      const currentFeatures = this.getState().features;
      currentFeatures.forEach((feature, i) => {
        const tasksOfFeature = this.tasksService.getTasksOfFeature(feature.id);
        if (feature.id === updatedTask.featureId) {
          feature.taskIds = tasksOfFeature.map((task) => task.id);
        } else {
          const updatedTaskIndex = feature.taskIds.indexOf(updatedTask.id);
          console.log(updatedTaskIndex);
          if (updatedTaskIndex !== -1) {
            feature.taskIds.splice(updatedTaskIndex, 1);
          }
        }
      });

      this.setState({ features: currentFeatures });
    });
  }

  private subscribeToTaskStateChangedEvent(): void {
    this.tasksService.taskStateChanged$.subscribe((updatedTask) => {
      const currentFeatures = this.getState().features;
      const featureIndex = currentFeatures.findIndex(
        (feature) => feature.id === updatedTask.featureId
      );

      if (featureIndex !== -1) {
        const featureToUpdate = currentFeatures[featureIndex];

        const tasksOfFeature = this.tasksService.getTasksOfFeature(
          featureToUpdate.id
        );

        const allTasksAreTodo = tasksOfFeature.every(
          (task) => task.state === State.TODO
        );
        const allTasksAreDone = tasksOfFeature.every(
          (task) => task.state === State.DONE
        );
        const atLeastOneTaskDoing = tasksOfFeature.some(
          (task) => task.state === State.DOING
        );

        if (allTasksAreTodo) {
          featureToUpdate.state = State.TODO;
        } else if (allTasksAreDone) {
          featureToUpdate.state = State.DONE;
        } else if (atLeastOneTaskDoing) {
          featureToUpdate.state = State.DOING;
        }

        this.updateFeature(featureToUpdate.id, featureToUpdate);
      } else {
        console.error('Feature not found for the updated task:', updatedTask);
      }
    });
  }

  updateFeature(id: number, updatedFeature: Feature): void {
    const currentFeatures = this.getState().features;
    const featureIndex = currentFeatures.findIndex(
      (feature) => feature.id === id
    );
    if (featureIndex !== -1) {
      const currentFeature = currentFeatures[featureIndex];
      const mergedFeature = { ...currentFeature, ...updatedFeature };
      currentFeatures[featureIndex] = mergedFeature;
      this.setState({ features: currentFeatures });
    }
  }
}
