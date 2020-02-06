import React from 'react';
import { connect } from 'react-redux';
import { fetchAdmin } from '../../state/actions/admin.actions';

class Profile extends React.Component {
  constructor() {
    super();
  }

  render() {
    let { isLoading, admin } = this.props;
    return (
      <div className="profile-section">
        <center>
          {isLoading ? (
            <p className="loader rloader"></p>
          ) : (
            <>
              <img className="profile-pic" src={admin.adminPicture} alt="" />
              <p className="profile-name">{admin.adminName}</p>
            </>
          )}
        </center>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { isLoading: store.admin.isLoading, admin: store.admin.adminDetails };
}

export default connect(mapStateToProps)(Profile);
