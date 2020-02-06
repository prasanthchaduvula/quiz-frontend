import { GET_QUESTIONS, GET_ADMIN, GET_QUIZSET } from '../types';

let intialState = {
  isLoading: true,
  adminDetails: '',
  quizsets: [],
  quizset: ''
};

export default function admin(state = intialState, action) {
  switch (action.type) {
    case GET_ADMIN:
      return {
        ...state,
        isLoading: false,
        adminDetails: action.payload,
        quizsets: action.payload.quizsetsId
      };
    case GET_QUIZSET:
      return {
        ...state,
        isLoading: false,
        quizset: action.payload
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
