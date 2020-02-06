import { GET_QUESTIONS, GET_ADMIN, GET_QUIZSET } from '../types';

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

export function getQuizset(payload) {
  return {
    type: GET_QUIZSET,
    payload
  };
}

export function fetchQuizset(quizsetId) {
  return dispatch => {
    fetch(`http://localhost:3001/api/v1/quizsets/${quizsetId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizAdminToken
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch(getQuizset(data.quizset));
      });
  };
}
