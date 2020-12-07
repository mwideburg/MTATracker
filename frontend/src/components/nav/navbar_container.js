import { connect } from 'react-redux';
import { logout, getFeed } from '../../actions/session_actions';

import NavBar from './navbar';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

const mDTP = dispatch => {
  return {
    getFeed: () => dispatch(getFeed()),
    logout: () => dispatch(logout())
  }

}

export default connect(
  mapStateToProps, mDTP
)(NavBar);