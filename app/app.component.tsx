import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import FlashMessage from "react-native-flash-message";
import * as eva from "@eva-design/eva";
import { AppLoading, LoadFontsTask, Task } from "./app-loading.component";
import TopStatusBar from "../components/status-bar.component";
import { SplashImage } from "../components/splash-image.component";
import AppNavigator from "../navigation/app.navigator";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";

const loadingTasks: Task[] = [
  () =>
    LoadFontsTask({
      "opensans-regular": require("../assets/fonts/opensans-regular.ttf"),
      "roboto-regular": require("../assets/fonts/roboto-regular.ttf"),
    }),
];

const App = () => {
  const { theme } = useSelector((state: RootState) => state.user.theme);

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={theme == "light" ? eva.light : eva.dark}
      >
        <SafeAreaProvider>
          <TopStatusBar />
          <FlashMessage position="top" />
          <AppNavigator />
        </SafeAreaProvider>
      </ApplicationProvider>
    </React.Fragment>
  );
};

const Splash = ({ loading }): React.ReactElement => (
  <SplashImage loading={loading} source={require("../assets/splash.png")} />
);

export default (): React.ReactElement => {
  const { theme } = useSelector((state: RootState) => state.user.theme);

  const defaultConfig: { mapping: string; theme: string } = {
    mapping: "eva",
    theme,
  };

  return (
    <AppLoading
      tasks={loadingTasks}
      initialConfig={defaultConfig}
      placeholder={Splash}
    >
      {(props) => <App {...props} />}
    </AppLoading>
  );
};
