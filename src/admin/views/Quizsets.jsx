import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAdmin } from '../../state/actions/admin.actions';
class Quizsets extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      quizsetArr: [],
      quizsetName: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/admin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizAdminToken
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ questions: data.admin.questionsId });
        this.state.questions.map(question =>
          this.setState({
            quizsetArr: this.state.quizsetArr.concat(question.quizset)
          })
        );
        this.setState({ quizsetName: [...new Set(this.state.quizsetArr)] });
      });
  }

  render() {
    let { quizsetName } = this.state;
    return (
      <>
        <div className="quizsets-list-wrapper">
          <div className="quizsets-list">
            {quizsetName.length ? (
              quizsetName &&
              quizsetName.map(quizset => (
                <NavLink
                  className="quizset-text"
                  to={`/admins/${localStorage.quizAdminName}/quizsets/${quizset}`}
                >
                  {quizset}
                </NavLink>
              ))
            ) : (
              <p className="quizlist-heading">No quizsets found, create </p>
            )}
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(store) {
  console.log(store.admin);
  return { quizsets: store.admin };
}

export default connect(mapStateToProps)(Quizsets);