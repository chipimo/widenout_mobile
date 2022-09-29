import React from "react";
import { LogBox } from "react-native";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LayoutsNavigator } from "./layouts.navigator";
import { ThemesNavigator } from "./themes.navigator";
import Search from "../scenes/Search";
import { HomeBottomNavigation } from "../components/home-bottom-navigation.component";
import { HomeDrawer } from "../components/HomeDrawer";
import { GroupNavigator } from "./groups.navigator";
import Notifications from "../scenes/Notifications";
import Messages from "../scenes/Messages";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const initialTabRoute: string = "Feeds";

const HomeTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    initialRouteName={initialTabRoute}
    screenOptions={{ headerShown: false }}
    tabBar={(props) => <HomeBottomNavigation {...props} />}
  >
    <BottomTab.Screen name="Feeds" component={LayoutsNavigator} />
    <BottomTab.Screen name="Groups" component={GroupNavigator} />
    <BottomTab.Screen name="Search" component={Search} />
    <BottomTab.Screen name="Notifications" component={Notifications} />
    <BottomTab.Screen name="Messages" component={Messages} />
  </BottomTab.Navigator>
);

const HomeNavigator = (): React.ReactElement => {
  const { showTopBar } = useSelector((state: RootState) => state.user.topBar);

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: showTopBar }}
      drawerContent={(props) => <HomeDrawer {...props} />}
    >
      <Drawer.Screen name="Widen Out" component={HomeTabsNavigator} />
      {/* <Drawer.Screen name='Theme' component={ThemesNavigator} />  */}
    </Drawer.Navigator>
  );
};
export default HomeNavigator;

LogBox.ignoreLogs(["Accessing the 'state'"]);
