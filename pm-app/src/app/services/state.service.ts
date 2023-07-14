import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class StateService<T> {
  private _state$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this._state$ = new BehaviorSubject<T>(initialState);
  }

  select<R>(project: (state: T) => R): Observable<R> {
    return this._state$.asObservable().pipe(map(project));
  }

  setState(partialState: Partial<T>): void {
    let currentState = this._state$.getValue();
    this._state$.next({ ...currentState, ...partialState });
  }

  getState(): T {
    return this._state$.getValue();
  }
}
