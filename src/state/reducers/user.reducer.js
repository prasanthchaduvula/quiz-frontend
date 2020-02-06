import {
  SHOW_USER,
  GET_QUESTIONS,
  GET_ALLQUIZSETS,
  GET_QUIZSET
} from '../types';

let intialState = {
  isLoading: true,
  userDetails: '',
  quizsets: [],
  marks: '',
  questions: ''
};

export default function user(state = intialState, action) {
  switch (action.type) {
    case SHOW_USER:
      return {
        ...state,
        isLoading: false,
        userDetails: action.payload,
        marks: action.payload.marksId.reverse()
      };
    case GET_ALLQUIZSETS:
      return {
        ...state,
        isLoading: false,
        quizsets: action.payload
      };
    case GET_QUIZSET:
      return {
        ...state,
        isLoading: false,
        questions: action.payload
      };
    default:
      return { ...state };
  }
}
