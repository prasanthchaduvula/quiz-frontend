import { combineReducers } from 'redux';

import admin from './admin.reducer';
import user from './user.reducer';

export default combineReducers({ admin, user });
