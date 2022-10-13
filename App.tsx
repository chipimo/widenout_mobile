import React, { useEffect } from "react";
// import { createTheme, ThemeProvider } from "@rneui/themed";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RootSiblingParent } from 'react-native-root-siblings';
import { persistor, store } from "./redux/configureStore";
import AppSrc from "./app/app.component";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <AppSrc />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};
export default App;
