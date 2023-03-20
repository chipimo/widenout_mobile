import { combineReducers } from "redux";
import userReducer from "./features/auth/userAuth";
import feedsReducer from "./features/feeds";
import PostCommentsReducer from "./features/feeds/comments";
import refreshFeedsReducer from "./features/feeds/refresh";
import drawerReducer from "./features/drawer";
import topBarReducer from "./features/drawer/showTopBar";
import bottomBarReducer from "./features/drawer/bottomToolBar";
import load_actionReducer from "./features/sync/load_action";
import expo_tokenReducer from "./features/expo_token";
import themeReducer from "./features/settings";
import searchReducer from "./features/searchData";

const rootReducers = combineReducers({
  user: userReducer,
  feeds: feedsReducer,
  postComments: PostCommentsReducer,
  load_action: load_actionReducer,
  expo_token: expo_tokenReducer,
  refreshFeeds: refreshFeedsReducer,
  topBar: topBarReducer,
  drawerState: drawerReducer,
  bottomBarState: bottomBarReducer,
  theme: themeReducer,
  search__: searchReducer,
});

export default rootReducers;
