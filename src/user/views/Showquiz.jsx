import React from 'react';
import { withRouter } from 'react-router-dom';
import { fetchQuestions, fetchQuizset } from '../../state/actions/user.actions';
import { connect } from 'react-redux';

class Showquiz extends React.Component {
  constructor() {
    super();
    this.state = {
      attemptedQus: []
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchQuizset(this.props.match.params.id));
  }

  handleAns = (event, _id, selectedOption) => {
    event.target.parentElement.parentElement.innerText = event.target.innerText;
    event.target.parentElement.style.visibility = 'hidden';
    this.setState({
      attemptedQus: this.state.attemptedQus.concat({
        Id: _id,
        selectedOption
      })
    });
  };

  handleSubmit = event => {
    fetch(
      `http://localhost:3001/api/v1/user/quizsets/${this.props.questions._id}/submit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.quizuserToken
        },
        body: JSON.stringify({
          attemptedQus: this.state.attemptedQus
        })
      }
    )
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
              <p onClick={this.handleSubmit} className="quizlist-submit-btn">
                SUBMIT
              </p>
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
