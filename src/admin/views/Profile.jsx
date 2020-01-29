import React from 'react';
import { connect } from 'react-redux';
import { fetchAdmin } from '../../state/actions/admin.actions';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(fetchAdmin());
  }
  render() {
    let { admin } = this.props;
    return (
      <div className="profile-section">
        <center>
          <img className="profile-pic" src={admin.adminPicture} alt="" />
          <p className="profile-name">{admin.adminName}</p>
        </center>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { admin: store.admin.admin };
}

export default connect(mapStateToProps)(Profile);
