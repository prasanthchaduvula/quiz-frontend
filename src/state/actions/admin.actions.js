import { GET_QUESTIONS, GET_ADMIN } from '../types';

export function getAdmin(payload) {
  return { type: GET_ADMIN, payload };
}

export function fetchAdmin() {
  return dispatch => {
    fetch('http://localhost:3001/api/v1/admin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizAdminToken
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch(getAdmin(data.admin));
      });
  };
}

export function getQuestions(payload) {
  return {
    type: GET_QUESTIONS,
    payload
  };
}

export function fetchQuestions(quizsetname) {
  return dispatch => {
    fetch('http://localhost:3001/api/v1/questions')
      .then(res => res.json())
      .then(data => {
        dispatch(getQuestions(data.questions));
      });
  };
}