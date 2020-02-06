import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { fetchQuizset } from '../../state/actions/admin.actions';
import { connect } from 'react-redux';

class EditQuizset extends React.Component {
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

  componentDidMount() {
    fetch(`http://localhost:3001/api/v1/quizsets/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({ quizsetName: data.quizset.quizsetName });
        }
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.quizsetName) {
      fetch(
        `http://localhost:3001/api/v1/quizsets/${this.props.match.params.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.quizAdminToken
          },
          body: JSON.stringify({
            quizsetName: this.state.quizsetName
          })
        }
      )
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

export default connect()(withRouter(EditQuizset));
