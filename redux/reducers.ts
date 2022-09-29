import {combineReducers} from 'redux';
import userReducer from './features/auth/userAuth';
import feedsReducer from './features/feeds';
import refreshFeedsReducer from './features/feeds/refresh';
import drawerReducer from './features/drawer';
import topBarReducer from './features/drawer/showTopBar';
import bottomBarReducer from './features/drawer/bottomToolBar';


const rootReducers = combineReducers({
    user: userReducer,
    feeds: feedsReducer,
    refreshFeeds: refreshFeedsReducer,
    topBar: topBarReducer,
    drawerState: drawerReducer,
    bottomBarState: bottomBarReducer,
  });
  
  export default rootReducers;