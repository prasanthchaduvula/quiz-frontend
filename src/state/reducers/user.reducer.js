import { SHOW_USER } from '../types';

let intialState = {
  userDetails: '',
  marks: ''
};

export default function user(state = intialState, action) {
  switch (action.type) {
    case SHOW_USER:
      return {
        ...state,
        userDetails: action.payload,
        marks: action.payload.marksId.reverse()
      };

    default:
      return { ...state };
  }
}
