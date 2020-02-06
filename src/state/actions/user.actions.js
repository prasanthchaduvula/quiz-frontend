import {
  SHOW_USER,
  GET_QUESTIONS,
  GET_ALLQUIZSETS,
  GET_QUIZSET
} from '../types';

export function showMarks(payload) {
  return { type: SHOW_USER, payload };
}

export function fetchUser() {
  return dispatch => {
    fetch('http://localhost:3001/api/v1/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizuserToken
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch(showMarks(data.user));
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

export function getAllquizsets(payload) {
  return {
    type: GET_ALLQUIZSETS,
    payload
  };
}

export function fetchAllquizsets() {
  return dispatch => {
    fetch('http://localhost:3001/api/v1/user/quizsets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizuserToken
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(getAllquizsets(data.quizsets));
        }
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
    fetch(`http://localhost:3001/api/v1/user/quizsets/${quizsetId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizuserToken
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch(getQuizset(data.quizset));
      });
  };
}
