import { useCallback, useReducer, useEffect, Reducer } from 'react';

import {
  ReducerState,
  ReducerAction,
  ChangeHandler,
  Comparator,
  UseControllableStateReturnType,
  SetStateFunction
} from './types';
import { isDefined, defaultComparator, setState } from './helpers';

export {
  ChangeHandler,
  Comparator,
  UseControllableStateReturnType,
  SetStateFunction
};

const CONTROLLED_STATE_CHANGE = Symbol('controlled');
const INTERNAL_STATE_CHANGE = Symbol('internal');

function reducer<T>(
  state: ReducerState<T>,
  { type, payload }: ReducerAction<T>
): ReducerState<T> {
  if (type === CONTROLLED_STATE_CHANGE) {
    const controlledChanges = setState(state.value, payload, state.comparator);
    return {
      comparator: state.comparator,
      value: controlledChanges,
      internalChanges: undefined
    };
  }
  if (type === INTERNAL_STATE_CHANGE) {
    const internalChanges = setState(state.value, payload, state.comparator);
    return {
      comparator: state.comparator,
      value: internalChanges,
      internalChanges
    };
  }
  return state;
}

export function useControllableState<T>(
  controlValue: T,
  onChange?: ChangeHandler<T>,
  comparator: Comparator<T> = defaultComparator
): UseControllableStateReturnType<T> {
  const initialState = {
    value: controlValue,
    comparator
  };
  const [{ value, internalChanges }, dispatch] = useReducer<
    Reducer<ReducerState<T>, ReducerAction<T>>,
    ReducerState<T>
  >(reducer, initialState, () => initialState);

  const setValue = useCallback(
    (newValue) =>
      dispatch({
        type: INTERNAL_STATE_CHANGE,
        payload: newValue
      }),
    []
  );

  const controlledSetValue = useCallback(
    (newValue) =>
      dispatch({
        type: CONTROLLED_STATE_CHANGE,
        payload: newValue
      }),
    []
  );

  useEffect(() => {
    if (onChange && isDefined(internalChanges)) {
      onChange(internalChanges);
    }
  }, [internalChanges, onChange]);

  useEffect(() => {
    controlledSetValue(controlValue);
  }, [controlledSetValue, controlValue]);

  return [value, setValue, controlledSetValue];
}
