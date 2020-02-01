import React from 'react';
import { withRouter } from 'react-router-dom';

class Questionedit extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      options: [],
      answer: '',
      quizset: ''
    };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    fetch(`http://localhost:3001/api/v1/questions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizAdminToken
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            title: data.question.title,
            option1: data.question.options[0],
            option2: data.question.options[1],
            option3: data.question.options[2],
            option4: data.question.options[3],
            answer: data.question.answer,
            quizset: data.question.quizset
          });
        }
      });
  }

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
    let { option1, option2, option3, option4 } = this.state;
    let optionsarr = [option1, option2, option3, option4];
    this.setState({ options: optionsarr });
  };

  handleSubmit = e => {
    e.preventDefault();
    let id = this.props.match.params.id;
    fetch(`http://localhost:3001/api/v1/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizAdminToken
      },
      body: JSON.stringify({
        title: this.state.title,
        options: this.state.options,
        answer: this.state.answer,
        quizset: this.state.quizset
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.props.history.push(
            `/admins/${localStorage.quizAdminName}/quizsets/${data.updatedQuestion.quizset}`
          );
        }
      });
  };

  render() {
    return (
      <div className="sign-wrapper">
        <div className="sign-section">
          <form className="sign-form">
            <label className="sign-label" htmlFor="">
              Question title
            </label>
            <input
              className="sign-input"
              type="text"
              name="title"
              placeholder="e.g: who is the founder of oyo rooms?"
              value={this.state.title}
              onChange={this.handleChange}
            />
            {/* // options // */}
            <div className="create-options">
              <label className="sign-label" htmlFor="">
                Options
              </label>
              <input
                className="sign-input"
                type="text"
                name="option1"
                placeholder="Jef Bezos"
                value={this.state.option1}
                onChange={this.handleChange}
              />
              <input
                className="sign-input"
                type="text"
                name="option2"
                placeholder="Ritesh Agarwal"
                value={this.state.option2}
                onChange={this.handleChange}
              />
              <input
                className="sign-input"
                type="text"
                name="option3"
                placeholder="Varun Agarwal"
                value={this.state.option3}
                onChange={this.handleChange}
              />
              <input
                className="sign-input"
                type="text"
                name="option4"
                placeholder="Rakesh Chahar"
                value={this.state.option4}
                onChange={this.handleChange}
              />
            </div>
            {/* // options // */}

            <label className="sign-label" htmlFor="">
              Correct answer
            </label>
            <input
              className="sign-input"
              type="text"
              name="answer"
              placeholder="Ritesh Agarwal"
              value={this.state.answer}
              onChange={this.handleChange}
            />
            <label className="sign-label" htmlFor="">
              Quizset Name
            </label>
            <input
              className="sign-input"
              type="text"
              name="quizset"
              placeholder="business"
              value={this.state.quizset}
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

export default withRouter(Questionedit);
