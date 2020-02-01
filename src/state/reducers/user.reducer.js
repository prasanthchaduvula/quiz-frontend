import { SHOW_USER, GET_QUESTIONS } from '../types';

let intialState = {
  userDetails: '',
  marks: '',
  questions: []
};

export default function user(state = intialState, action) {
  switch (action.type) {
    case SHOW_USER:
      return {
        ...state,
        userDetails: action.payload,
        marks: action.payload.marksId.reverse()
      };
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    default:
      return { ...state };
  }
}
