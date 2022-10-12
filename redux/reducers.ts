import {combineReducers} from 'redux';
import userReducer from './features/auth/userAuth';
import feedsReducer from './features/feeds';
import PostCommentsReducer from './features/feeds/comments';
import refreshFeedsReducer from './features/feeds/refresh';
import drawerReducer from './features/drawer';
import topBarReducer from './features/drawer/showTopBar';
import bottomBarReducer from './features/drawer/bottomToolBar';


const rootReducers = combineReducers({
    user: userReducer,
    feeds: feedsReducer,
    postComments: PostCommentsReducer,
    refreshFeeds: refreshFeedsReducer,
    topBar: topBarReducer,
    drawerState: drawerReducer,
    bottomBarState: bottomBarReducer,
  });
  
  export default rootReducers;