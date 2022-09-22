import {combineReducers} from 'redux';
import userReducer from './features/auth/userAuth';
import feedsReducer from './features/feeds';
import drawerReducer from './features/drawer';


const rootReducers = combineReducers({
    user: userReducer,
    feeds: feedsReducer,
    drawerState: drawerReducer,
  });
  
  export default rootReducers;