import { SHOW_USER } from '../types';

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
