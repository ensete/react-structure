import { exActionTypes } from '../actions/exAction';

export const initialExState = {
  example: 'example 1',
  example2: 'example 2'
};

export function initEx(initialExState: object) {
  return initialExState;
}

export function exReducer(state: any, action: any) {
  switch (action.type) {
    case exActionTypes.SET_EXAMPLE: {
      return {
        ...state,
        example: action.payload
      }
    }
    default:
      return state;
  }
}
