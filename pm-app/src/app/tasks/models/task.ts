import { Feature } from 'src/app/features/models/feature';
import { Priority } from 'src/app/shared/enums/priority.enum';
import { State } from 'src/app/shared/enums/state.enum';
import { User } from 'src/app/users/models/user';

export class Task {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public priority: Priority,
    public featureId: number,
    public state: State,
    public userId?: number
  ) {}
}
