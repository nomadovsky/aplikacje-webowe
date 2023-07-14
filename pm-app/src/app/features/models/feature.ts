import { Project } from 'src/app/projects/models/project';
import { Priority } from 'src/app/shared/enums/priority.enum';
import { State } from 'src/app/shared/enums/state.enum';
import { Task } from 'src/app/tasks/models/task';
import { User } from 'src/app/users/models/user';

export class Feature {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public priority: Priority,
    public projectId: number,
    public ownerId: number,
    public state: State,
    public taskIds: number[]
  ) {}
}
