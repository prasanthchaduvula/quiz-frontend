import React from 'react';
import { withRouter } from 'react-router-dom';
import { fetchQuestions } from '../../state/actions/user.actions';
import { connect } from 'react-redux';

class Showquiz extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      quizname: '',
      filterqns: [],
      marks: 0,
      ans: false
    };
  }

  handleQuestions = () => {
    this.setState({ quizname: this.props.match.params.quizname });
    this.props.dispatch(fetchQuestions());

    fetch('http://localhost:3001/api/v1/questions')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log(data);
          data.questions.map(question =>
            question.quizset == this.state.quizname
              ? this.setState({
                  filterqns: this.state.filterqns.concat(question)
                })
              : ''
          );
        }
      });
  };
  componentDidMount() {
    this.handleQuestions();
  }

  handleAns = (event, _id, ans) => {
    this.setState({ ans: true });
    event.target.parentElement.parentElement.innerText = event.target.innerText;
    event.target.parentElement.style.visibility = 'hidden';
    this.setState({ show: true });
    let { marks, filterqns } = this.state;
    filterqns.map(question => {
      if (question._id == _id) {
        return question.answer == ans
          ? this.setState({ marks: marks + 1 })
          : '';
      }
    });
  };

  handleSubmit = () => {
    fetch('http://localhost:3001/api/v1/user/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizuserToken
      },
      body: JSON.stringify({
        mark: this.state.marks,
        totalmark: this.state.filterqns.length,
        quizsetName: this.state.quizname
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.props.history.push(`/users/${localStorage.quizuserName}/marks`);
        }
      });
  };

  render() {
    let { ans, quizname, filterqns, show } = this.state;
    return (
      <div className="quizlist-section">
        <div className="quizlist-heading-section">
          <p className="quizlist-heading">{filterqns.length ? quizname : ''}</p>
          <p
            onClick={this.handleSubmit}
            className={`${show ? 'quizlist-submit-btn' : ''} `}
          >
            {show ? 'SUBMIT' : ''}
          </p>
        </div>
        {filterqns.length ? (
          filterqns.map((question, index) => (
            <div className="quiz-card-wrapper">
              <div>
                <p className="question-no">{index + 1}.</p>
              </div>

              <div className="question-card">
                <p className="question-title">{question.title}</p>
                <div
                  className={`question-answers ${
                    ans ? 'question-ans-selected' : ''
                  }`}
                >
                  <div>
                    {question.options.map(option => (
                      <button
                        onClick={event => {
                          this.handleAns(event, question._id, option);
                        }}
                        className="question-answers-item"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="quizlist-heading">no question found</p>
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { filterqns: store.user.questions };
}

export default connect(mapStateToProps)(withRouter(Showquiz));
