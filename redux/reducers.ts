import {combineReducers} from 'redux';
import userReducer from './features/auth/userAuth';


const rootReducers = combineReducers({
    user: userReducer,
  });
  
  export default rootReducers;