import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllquizsets } from '../../state/actions/user.actions';
class Quizsets extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.dispatch(fetchAllquizsets());
  }

  render() {
    let { isLoading, quizsets } = this.props;

    return (
      <>
        <div className="quizsets-list-wrapper rquizsets-list-wrapper">
          {isLoading ? (
            <p className="loader rloader"></p>
          ) : (
            <div className="quizsets-list">
              {quizsets &&
                quizsets.map(quizset => (
                  <NavLink
                    className="quizset-text"
                    to={`/users/${localStorage.quizuserName}/quizsets/${quizset.quizsetName}/${quizset._id}`}
                  >
                    {quizset.quizsetName}
                  </NavLink>
                ))}
            </div>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(store) {
  console.log(store.user.quizsets);
  return { isLoading: store.user.isLoading, quizsets: store.user.quizsets };
}

export default connect(mapStateToProps)(Quizsets);
