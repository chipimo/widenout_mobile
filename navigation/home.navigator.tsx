import React from 'react';
import { LogBox } from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LayoutsNavigator } from './layouts.navigator';
import { ComponentsNavigator } from './components.navigator';
import { ThemesNavigator } from './themes.navigator';
import { HomeBottomNavigation } from '../scenes/home/home-bottom-navigation.component';
import { HomeDrawer } from '../scenes/home/home-drawer.component';
import { LibrariesScreen } from '../scenes/libraries/libraries.component';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const initialTabRoute: string = 'Feeds';

const ROOT_ROUTES: string[] = ['Home', 'Feeds', 'Search', 'Groups'];

const TabBarVisibilityOptions = ({ route }): BottomTabNavigationOptions => {
  const isNestedRoute: boolean = route.state?.index > 0;
  const isRootRoute: boolean = ROOT_ROUTES.includes(route.name);

  return { tabBarVisible: isRootRoute && !isNestedRoute };
};

const HomeTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibilityOptions}
    initialRouteName={initialTabRoute}
    tabBar={props => <HomeBottomNavigation {...props} />}>
    <BottomTab.Screen name='Feeds' component={LayoutsNavigator} />
    <BottomTab.Screen name='Search' component={ComponentsNavigator} />
    <BottomTab.Screen name='Groups' component={ThemesNavigator} />
  </BottomTab.Navigator>
);

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{ gestureEnabled: true }}
    drawerContent={props => <HomeDrawer {...props} />}>
    <Drawer.Screen name='Home' component={HomeTabsNavigator} />
    <Drawer.Screen name='Theme' component={ThemesNavigator} /> 
  </Drawer.Navigator>
);

LogBox.ignoreLogs(['Accessing the \'state\'']);
