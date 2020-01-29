import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../state/actions/user.actions';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: ''
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchUser());
  }
  render() {
    let { user } = this.props;
    return (
      <div className="profile-section">
        <center>
          <img className="profile-pic" src={user.userPicture} alt="" />
          <p className="profile-name">{user.userName}</p>
        </center>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { user: store.user.userDetails };
}

export default connect(mapStateToProps)(Profile);
