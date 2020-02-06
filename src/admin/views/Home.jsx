import React from 'react';
import { NavLink } from 'react-router-dom';
import { fetchAdmin } from '../../state/actions/admin.actions';
import Profile from './Profile';
import Quizsets from './Quizsets';
import { connect } from 'react-redux';

class Home extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAdmin());
  }
  render() {
    let { isLoading } = this.props;

    return (
      <div className="home-section">
        {isLoading ? (
          <p className="loader rloader"></p>
        ) : (
          <div className="home-wrapper rhome-wrapper">
            <Profile />
            <Quizsets />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { isLoading: store.admin.isLoading };
}

export default connect(mapStateToProps)(Home);
