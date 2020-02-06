import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class CreateQuizset extends React.Component {
  constructor() {
    super();
    this.state = {
      quizsetName: ''
    };
  }

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.quizsetName) {
      fetch('http://localhost:3001/api/v1/quizsets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.quizAdminToken
        },
        body: JSON.stringify({
          quizsetName: this.state.quizsetName
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.props.history.push(`/admins/${localStorage.quizAdminName}`);
          } else {
            alert(`${data.message}`);
          }
        });
    } else {
      alert('fill all the details');
    }
  };

  render() {
    return (
      <div className="sign-wrapper rsign-wrapper">
        <div className="sign-section">
          <form className="sign-form">
            <label className="sign-label" htmlFor="">
              Quizset Name
            </label>
            <input
              className="sign-input"
              type="text"
              name="quizsetName"
              placeholder="e.g: cricket, bollywood"
              value={this.state.quizsetName}
              onChange={this.handleChange}
            />
            <input
              className="sign-btn nav-item-btn"
              type="submit"
              value="PUBLISH"
              onClick={this.handleSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateQuizset);
