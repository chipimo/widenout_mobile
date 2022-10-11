import { configureStore, compose } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./listenerMiddleware";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import immutableTransform from "redux-persist-transform-immutable";
import rootReducer from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersApi } from "../services/fetch.user.service";

const persistConfig = {
  key: "root",
  transforms: [immutableTransform()],
  storage: AsyncStorage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    // [postApi.reducerPath]: postApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(listenerMiddleware.middleware)
      .concat(usersApi.middleware),
});
export const persistor = persistStore(store)

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
