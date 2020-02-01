import { GET_QUESTIONS, GET_ADMIN } from '../types';

let intialState = {
  admin: '',
  questions: [],
  filterqns: [],
  quizsets: []
};

export default function admin(state = intialState, action) {
  switch (action.type) {
    case GET_ADMIN:
      return {
        ...state,
        admin: action.payload,
        quizsets: action.payload.questionsId.map(question => [
          state.quizsets.concat(question.quizset)
        ])
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
