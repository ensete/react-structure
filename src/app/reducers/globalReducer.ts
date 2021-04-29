import { globalActionTypes } from 'src/app/actions/globalAction';

const initialState = {
  data: {},
  modal: {
    loading: false
  }
};

export default function globalReducer(state = initialState, action: any) {
  switch (action.type) {
    case globalActionTypes.SET_DATA: {
      return {
        ...state,
        data: action.payload
      }
    }
    case globalActionTypes.SET_MODAL: {
      const { key, isOpened } = action.payload;

      return {
        ...state,
        modal: {
          ...state.modal,
          [key]: isOpened
        }
      }
    }
    default:
      return state;
  }
}
