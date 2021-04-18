export type Comparator<T> = (a: T, b: T) => boolean;
export type SetStateFunction<T> = (previousValue: T) => T;

export interface ReducerState<T> {
  value?: T;
  internalChanges?: T;
  comparator: Comparator<T>;
}

export interface ReducerAction<T> {
  type: Symbol;
  payload: T | SetStateFunction<T>;
}

export type ChangeHandler<T> = (value: T) => void;

export type UseControllableStateReturnType<T> = [
  T | undefined,
  (value: T | SetStateFunction<T>) => void,
  (value: T | SetStateFunction<T>) => void
];
