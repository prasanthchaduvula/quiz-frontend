import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchQuestions } from '../../state/actions/admin.actions';
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
    this.setState({ quizname: this.props.match.params.quizname });
    this.props.dispatch(fetchQuestions(this.props.match.params.quizname));
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
    let { quizname } = this.state;
    let { filterqns } = this.props;

    return (
      <div className="quizlist-section">
        <p className="quizlist-heading">{quizname}</p>
        {filterqns.map((question, index) =>
          question.quizset == quizname ? (
            <div className="quiz-card-wrapper">
              <div>
                <p className="question-no">{index}.</p>
                <p
                  onClick={() => this.handleDelete(question._id)}
                  className="question-no"
                >
                  ❌
                </p>
                <NavLink
                  to={`/admins/${localStorage.quizAdminName}/quizsets/${quizname}/${question.title}/${question._id}/edit/`}
                  className="question-no"
                >
                  ✏️
                </NavLink>
              </div>

              <div className="question-card">
                <p className="question-title">{question.title}</p>
                <div className="question-answers">
                  {question.options.map(option => (
                    <button className="question-answers-item">{option}</button>
                  ))}

                  <button className="question-answers-item correct-answer">
                    {question.answer}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ''
          )
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { filterqns: store.admin.questions };
}

export default connect(mapStateToProps)(withRouter(Showquiz));
