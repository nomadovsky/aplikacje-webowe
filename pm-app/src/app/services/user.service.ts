import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { UsersState } from '../states/users.state';
import { User } from '../users/models/user';

const defaultUser = new User(0, 'SleepyJoe', 'Joe', 'Nideb');

@Injectable({ providedIn: 'root' })
export class UsersService extends StateService<UsersState> {
  constructor() {
    super({ users: [defaultUser] });
  }

  getAllUsers() {
    return this.select((state) => state.users);
  }
}
