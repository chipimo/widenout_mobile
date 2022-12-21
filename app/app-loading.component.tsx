import React, { useEffect, useRef, useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import ExpoAppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import { set_expo_token } from "../redux/features/expo_token";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export type TaskResult<T = any> = [string, T];
export type Task = () => Promise<TaskResult | null>;

export interface ApplicationLoaderProps<LoadableConfiguration = any> {
  tasks?: Task[];
  initialConfig?: LoadableConfiguration;
  placeholder?: (props: { loading: boolean }) => React.ReactElement;
  children: (config: LoadableConfiguration) => React.ReactElement;
}

export const LoadFontsTask = (fonts: {
  [key: string]: number;
}): Promise<TaskResult> => {
  return Font.loadAsync(fonts).then(() => null);
};

export const LoadAssetsTask = (assets: number[]): Promise<TaskResult> => {
  const tasks: Promise<void>[] = assets.map((source: number): Promise<void> => {
    return Asset.fromModule(source).downloadAsync().then();
  });

  return Promise.all(tasks).then(() => null);
};

/**
 * Loads application configuration and returns content of the application when done.
 *
 * @property {Task[]} tasks - Array of tasks to prepare application before it's loaded.
 * A single task should return a Promise with value and a by which this value is accessible.
 *
 * @property {LoadableConfiguration} initialConfig - Configuration to use by default.
 * May be useful at first run.
 *
 * @property {(props: { loaded: boolean }) => React.ReactElement} placeholder - Element to render
 * while application is loading.
 *
 * @property {(config: LoadableConfiguration) => React.ReactElement} children - Should return Application component
 */
export const AppLoading: React.FC<ApplicationLoaderProps> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const loadingResult = React.useRef(props.initialConfig || {});

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const dispatch = useDispatch();

  const onTasksFinish = (): void => {
    setLoading(false);
    SplashScreen.hideAsync();
  };

  const saveTaskResult = (result: TaskResult | null): void => {
    if (result) {
      loadingResult.current[result[0]] = result[1];
    }
  };

  const startTasks = (): Promise<void> => {
    return Promise.all(
      props.tasks.map((task) => task().then(saveTaskResult))
    ).then();
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token);
      dispatch(set_expo_token({ token }));
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const renderLoadingElement = (): React.ReactElement => (
    <ExpoAppLoading
      autoHideSplash={false}
      startAsync={startTasks}
      onFinish={onTasksFinish}
      onError={console.error}
    />
  );

  return (
    <>
      {loading ? renderLoadingElement() : props.children(loadingResult.current)}
      {props.placeholder && props.placeholder({ loading })}
    </>
  );
};

AppLoading.defaultProps = {
  tasks: [],
  initialConfig: {},
};
