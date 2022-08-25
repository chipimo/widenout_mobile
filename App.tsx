import React, { useEffect } from "react";
// import { createTheme, ThemeProvider } from "@rneui/themed";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/configureStore";
import AppSrc from "./app/app.component";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppSrc />
      </PersistGate>
    </Provider>
  );
};
export default App;
