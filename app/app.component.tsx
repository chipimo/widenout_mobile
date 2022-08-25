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

const loadingTasks: Task[] = [
  () =>
    LoadFontsTask({
      "opensans-regular": require("../assets/fonts/opensans-regular.ttf"),
      "roboto-regular": require("../assets/fonts/roboto-regular.ttf"),
    }),
];

const defaultConfig: { mapping: string; theme: string } = {
  mapping: "eva",
  theme: "light",
};

const App = () => {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
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
  <SplashImage
    loading={loading}
    source={require("../assets/images/img_background_splash.png")}
  />
);

export default (): React.ReactElement => (
  <AppLoading
    tasks={loadingTasks}
    initialConfig={defaultConfig}
    placeholder={Splash}
  >
    {(props) => <App {...props} />}
  </AppLoading>
);
