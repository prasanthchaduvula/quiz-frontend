import React from 'react';
import { NavLink } from 'react-router-dom';
import Profile from './Profile';
import Quizsets from './Quizsets';
import { connect } from 'react-redux';
import { fetchUser, fetchAllquizsets } from '../../state/actions/user.actions';

class Home extends React.Component {
  render() {
    return (
      <div className="home-section">
        <div className="home-wrapper rhome-wrapper">
          <Profile />
          <Quizsets />
        </div>
      </div>
    );
  }
}

export default connect()(Home);
