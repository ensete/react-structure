import { exActionTypes } from 'src/+app/actions/ex-action';

const initialState = {
  example: 'example 1',
  example2: 'example 2'
};

export default function exReducer(state: any = initialState, action: any) {
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
