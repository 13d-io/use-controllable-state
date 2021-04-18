import { Comparator, SetStateFunction } from './types';

function isSetStateFunction<T>(
  value: T | SetStateFunction<T>
): value is SetStateFunction<T> {
  return typeof value === 'function';
}

export function isDefined<T>(value?: T): value is T {
  return value !== undefined;
}

export const defaultComparator: Comparator<any> = (a, b) => a === b;

export function setState<T>(
  previousValue: T,
  newValue: T | SetStateFunction<T>,
  comparator: Comparator<T>
): T {
  const result = isSetStateFunction(newValue)
    ? newValue(previousValue)
    : newValue;
  if (comparator(previousValue, result)) {
    return previousValue;
  }
  return result;
}
