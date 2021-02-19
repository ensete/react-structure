import { globalActionTypes } from 'src/app/actions/globalAction';

const initialState = {
  data: {},
  message: {
    isOpen: false,
    value: '',
    type: ''
  },
};

export default function globalReducer(state = initialState, action: any) {
  switch (action.type) {
    case globalActionTypes.SET_MESSAGE: {
      const { isOpen, message, type } = action.payload;

      return {
        ...state,
        message: {
          isOpen: isOpen,
          value: message ? message : state.message.value,
          type: type ? type : state.message.type
        }
      }
    }
    case globalActionTypes.SET_DATA: {
      return {
        ...state,
        data: action.payload
      }
    }
    default:
      return state;
  }
}
