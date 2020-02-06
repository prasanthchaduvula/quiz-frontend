import React from 'react';
import { NavLink } from 'react-router-dom';

class Hero extends React.Component {
  render() {
    return (
      <>
        <div className="hero-section">
          <center className="hero-wrapper">
            <p className="hero-text">
              Create a quizset so that your users can appear for exam
            </p>
            <NavLink className="hero-btn nav-item-btn" to="/admins/signin">
              Get Started
            </NavLink>
          </center>
        </div>
        <div className="footer-section">
          <div className="footer-wrapper rfooter-wrapper">
            <div className="rfooter-wrapper-items">
              <NavLink className="footer-items rfooter-items" to="/">
                ABOUT ME
              </NavLink>
              <NavLink className="footer-items rfooter-items" to="/">
                HELP
              </NavLink>
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

export default Hero;
