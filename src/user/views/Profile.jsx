import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../state/actions/user.actions';

class Profile extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.dispatch(fetchUser());
  }
  render() {
    let { isLoading, user } = this.props;
    return (
      <div className="profile-section">
        <center>
          {isLoading ? (
            <p className="loader rloader"></p>
          ) : (
            <>
              <img className="profile-pic" src={user.userPicture} alt="" />
              <p className="profile-name">{user.userName}</p>
            </>
          )}
        </center>
      </div>
    );
  }
}

function mapStateToProps(store) {
  console.log(store);
  return { isLoading: store.user.isLoading, user: store.user.userDetails };
}

export default connect(mapStateToProps)(Profile);
