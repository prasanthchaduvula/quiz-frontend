import { GET_QUESTIONS, GET_ADMIN } from '../types';

let intialState = {
  admin: '',
  questions: [],
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

    default:
      return { ...state };
  }
}
