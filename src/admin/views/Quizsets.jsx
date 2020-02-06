import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAdmin } from '../../state/actions/admin.actions';
class Quizsets extends React.Component {
  constructor() {
    super();
  }

  handleDelete = id => {
    fetch(`http://localhost:3001/api/v1/quizsets/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizAdminToken
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('deleted successfully');
          this.props.dispatch(fetchAdmin());
        }
      });
  };
  render() {
    let { isLoading, quizsets } = this.props;
    return (
      <>
        <div className="quizsets-list-wrapper rquizsets-list-wrapper">
          {isLoading ? (
            <p className="loader rloader"></p>
          ) : (
            <div className="quizsets-list rquizsets-list">
              {quizsets.length ? (
                quizsets &&
                quizsets.map(quizset => (
                  <div className="quizset-btn-wrapper">
                    <NavLink
                      className="quizset-btn-text"
                      to={`/admins/${localStorage.quizAdminName}/quizsets/${quizset.quizsetName}/${quizset._id}`}
                    >
                      {quizset.quizsetName}
                    </NavLink>
                    <p
                      onClick={() => this.handleDelete(quizset._id)}
                      className="question-btn-no"
                    >
                      ❌
                    </p>
                    <NavLink
                      to={`/admins/${localStorage.quizAdminName}/quizsets/${quizset.quizsetName}/${quizset._id}/edit/`}
                      className="question-btn-no"
                    >
                      ✏️
                    </NavLink>
                  </div>
                ))
              ) : (
                <p className="quizlist-heading">
                  No quizsets found, create a quizsets
                </p>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(store) {
  return { isLoading: store.admin.isLoading, quizsets: store.admin.quizsets };
}

export default connect(mapStateToProps)(Quizsets);
