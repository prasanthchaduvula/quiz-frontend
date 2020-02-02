import React from 'react';
import { NavLink } from 'react-router-dom';

class LandingPage extends React.Component {
  render() {
    return (
      <>
        <div className="hero-section">
          <center className="hero-wrapper">
            <p className="hero-text">Welcome to Quiz</p>

            <NavLink
              className="hero-btn nav-item-btn"
              to={
                localStorage.quizAdminToken
                  ? `/admins/${localStorage.quizAdminName}`
                  : '/admins'
              }
            >
              Get Started As Admin
            </NavLink>
            <NavLink
              className="hero-btn nav-item-btn landing-page-btn"
              to={
                localStorage.quizuserToken
                  ? `/users/${localStorage.quizuserName}`
                  : '/users'
              }
            >
              Get Started As User
            </NavLink>
          </center>
        </div>
        <div className="footer-section">
          <div className="footer-wrapper">
            <div>
              <a
                className="footer-items"
                href="https://github.com/chaduvulaprasanth"
                target="_blank"
              >
                ABOUT ME
              </a>
              <a
                className="footer-items"
                href="https://twitter.com/chaduvula98"
                target="_blank"
              >
                HELP
              </a>
            </div>
            <small className="footer-copy">
              © 2020 Quiz from Chaduvula Prasanth
            </small>
          </div>
        </div>
      </>
    );
  }
}

export default LandingPage;
