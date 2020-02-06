import React from 'react';
import { withRouter } from 'react-router-dom';
import { fetchQuestions, fetchQuizset } from '../../state/actions/user.actions';
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

  componentDidMount() {
    this.props.dispatch(fetchQuizset(this.props.match.params.id));
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
    let { isLoading, questions } = this.props;
    return (
      <div className="quizlist-section">
        {isLoading ? (
          <p className="loader rloader"></p>
        ) : (
          <>
            <div className="quizlist-heading-section">
              <p className="quizlist-heading">
                {questions && questions.quizsetName}
              </p>
              {/* <p
                onClick={this.handleSubmit}
                // className={`${show ? 'quizlist-submit-btn' : ''} `}
              >
                {/* {show ? 'SUBMIT' : ''} */}
              {/* </p> */}
            </div>

            {questions &&
              questions.questionsId.map((question, index) => (
                <div className="quiz-card-wrapper">
                  <div>
                    <p className="question-no">{index + 1}.</p>
                  </div>

                  <div className="question-card">
                    <p className="question-title">{question.title}</p>
                    <div
                      className={`question-answers

                `}
                    >
                      <div>
                        <button
                          onClick={event => {
                            this.handleAns(
                              event,
                              question._id,
                              question.option1
                            );
                          }}
                          className="question-answers-item rquestion-answers-item "
                        >
                          {question.option1}
                        </button>
                        <button
                          onClick={event => {
                            this.handleAns(
                              event,
                              question._id,
                              question.option2
                            );
                          }}
                          className="question-answers-item rquestion-answers-item "
                        >
                          {question.option2}
                        </button>
                        <button
                          onClick={event => {
                            this.handleAns(
                              event,
                              question._id,
                              question.option3
                            );
                          }}
                          className="question-answers-item rquestion-answers-item "
                        >
                          {question.option3}
                        </button>
                        <button
                          onClick={event => {
                            this.handleAns(
                              event,
                              question._id,
                              question.option4
                            );
                          }}
                          className="question-answers-item rquestion-answers-item "
                        >
                          {question.option4}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { isLoading: store.user.isLoading, questions: store.user.questions };
}

export default connect(mapStateToProps)(withRouter(Showquiz));
