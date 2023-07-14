import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { ProjectsState } from '../states/projects.state';
import { Project } from '../projects/models/project';

const defaultProjects = [
  new Project(0, 'Project 1', 'Description of project 1'),
];

@Injectable({ providedIn: 'root' })
export class ProjectsService extends StateService<ProjectsState> {
  constructor() {
    super({ projects: defaultProjects });
  }

  getAllProjects() {
    return this.select((state) => state.projects);
  }
}
