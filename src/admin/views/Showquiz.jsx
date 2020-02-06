import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchQuizset } from '../../state/actions/admin.actions';
import { connect } from 'react-redux';
class Showquiz extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      quizname: '',
      filterqns: []
    };
  }

  handleQuestions = () => {
    this.props.dispatch(fetchQuizset(this.props.match.params.id));
  };
  componentDidMount() {
    this.handleQuestions();
  }

  handleDelete = id => {
    fetch(`http://localhost:3001/api/v1/questions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizAdminToken
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({ show: true });
          this.handleQuestions();
        }
      });
  };

  render() {
    let { isLoading, quizset } = this.props;

    return (
      <div className="quizlist-section">
        {isLoading ? (
          <p className="loader rloader"></p>
        ) : (
          quizset && (
            <>
              <div className="quizlist-header">
                <p className="quizlist-quizsetname">{quizset.quizsetName}</p>
                <NavLink
                  className="addquestion"
                  to={`/admins/${localStorage.quizAdminName}/quizsets/${quizset.quizsetName}/${quizset._id}/addquestion`}
                >
                  Add a question
                </NavLink>
              </div>
              <div className="quizlist-card-wrapper">
                {quizset.questionsId.length ? (
                  <>
                    {quizset.questionsId.map((question, index) => (
                      <div className="quiz-card">
                        <div>
                          <p className="question-no">{index + 1}.</p>
                          <p
                            onClick={() => this.handleDelete(question._id)}
                            className="question-no"
                          >
                            ❌
                          </p>
                          <NavLink
                            to={`/admins/${localStorage.quizAdminName}/quizsets/${quizset.quizsetName}/${question.title}/${question._id}/edit/`}
                            className="question-no"
                          >
                            ✏️
                          </NavLink>
                        </div>
                        <div className="question-card">
                          <p className="question-title">{question.title}</p>
                          <div className="quizlist-card-wrapper">
                            <button className="question-answers-item rquestion-answers-item">
                              {question.option1}
                            </button>
                            <button className="question-answers-item rquestion-answers-item">
                              {question.option2}
                            </button>
                            <button className="question-answers-item rquestion-answers-item">
                              {question.option3}
                            </button>
                            <button className="question-answers-item rquestion-answers-item">
                              {question.option4}
                            </button>
                            <button className="question-answers-item rquestion-answers-item correct-answer">
                              {question.answer}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="quizlist-quizsetname">
                    No questions found, add a new question
                  </p>
                )}
              </div>
            </>
          )
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { isLoading: store.admin.isLoading, quizset: store.admin.quizset };
}

export default connect(mapStateToProps)(withRouter(Showquiz));
