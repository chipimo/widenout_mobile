import React from "react";
import { Image, LogBox, TouchableOpacity, View } from "react-native";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LayoutsNavigator } from "./layouts.navigator";
import { ThemesNavigator } from "./themes.navigator";

import { HomeBottomNavigation } from "../components/home-bottom-navigation.component";
import { HomeDrawer } from "../components/HomeDrawer";
import { ArrowIosBackIcon, SearchIcon } from "../components/icons";
import { GroupNavigator } from "./groups.navigator";
import Notifications from "../scenes/Notifications";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import { MessagesNavigator } from "./messages.navigation";
import People from "../scenes/People";
import {
  Avatar,
  Button,
  Input,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { GLOBALTYPES } from "../redux/globalTypes";
import { HideTopBar } from "../redux/features/drawer/showTopBar";
import { SearchNavigator } from "./search";
import { useSearchMutation } from "../services/fetch.user.service";
import { search_ } from "../redux/features/searchData";
import { setLoader } from "../redux/features/actionLoader";
import { unSetLoader } from "../redux/features/actionLoader";

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
    <BottomTab.Screen name="People" component={People} />
    <BottomTab.Screen name="Notifications" component={Notifications} />
    <BottomTab.Screen name="Messages" component={MessagesNavigator} />
    {/* <BottomTab.Screen name="SearchNavigator" component={SearchNavigator} /> */}
  </BottomTab.Navigator>
);

const HomeNavigator = (): React.ReactElement => {
  const { showTopBar } = useSelector((state: RootState) => state.user.topBar);
  const { user } = useSelector((state: RootState) => state.user.user);
  const styles = useStyleSheet(themedStyles);
  const [search] = useSearchMutation();
  const dispatchEvent = useDispatch();

  const [SearchValue, setSearchValue] = React.useState("");

  const onSearch = async (inputSearchValue) => {
    setSearchValue(inputSearchValue);
    dispatchEvent(setLoader({}));

    const searchResult = await search({
      start: 0,
      per_page: 10,
      value: inputSearchValue,
    }).unwrap();

    dispatchEvent(search_({ list: searchResult }));
    dispatchEvent(unSetLoader({}));
    // console.log(searchResult);
  };

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: showTopBar }}
      drawerContent={(props) => <HomeDrawer {...props} />}
    >
      <Drawer.Screen
        name="Widen Out"
        options={({ navigation }) => ({
          title: "Widen out",
          headerStyle: { backgroundColor: "#212F37" },
          headerLeft: () => (
            <View style={styles.imageContainer}>
              <Image
                style={styles.stretch}
                source={require("../assets/icon.png")}
              />
            </View>
          ),
          headerTitle: () => (
            <TouchableOpacity
              onPress={() => {
                // dispatchEvent(HideTopBar(true));
                navigation.navigate("SearchNavigator");
              }}
              style={styles.searchBox}
            >
              <View>
                <Text style={styles.searchText}>Search people, groups</Text>
              </View>
              <SearchIcon />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.avatar}
              onPress={() => navigation.toggleDrawer()}
            >
              <Avatar
                size="small"
                source={{ uri: GLOBALTYPES.imageLink + user.image }}
              />
            </TouchableOpacity>
          ),
        })}
        component={HomeTabsNavigator}
      />
      {/* <Drawer.Screen name='Theme' component={ThemesNavigator} />  */}
      <Drawer.Screen
        name="SearchNavigator"
        options={({ navigation }) => ({
          title: "Widen out",
          headerStyle: { backgroundColor: "#212F37" },
          headerLeft: () => (
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowIosBackIcon />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => (
            <Input
              textStyle={{ color: "#ccc" }}
              placeholder="Search people, groups"
              value={SearchValue}
              style={styles.searchInputBoxMain}
              onChangeText={(nextValue) => onSearch(nextValue)}
              autoFocus={true}
              accessoryRight={<SearchIcon />}
            />
          ),
        })}
        component={SearchNavigator}
      />
    </Drawer.Navigator>
  );
};
export default HomeNavigator;

const themedStyles = StyleService.create({
  imageContainer: {
    marginLeft: 22,
  },
  avatar: {
    marginRight: 20,
  },
  searchBox: {
    backgroundColor: "#162027",
    width: 200,
    height: 35,
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchBoxMain: {
    backgroundColor: "#162027",
    width: "90%",
    height: 35,
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInputBoxMain: {
    backgroundColor: "#162027",
    borderColor: "#000",
    width: "95%",
    height: 35,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    color: "#777170",
    width: 5,
    height: 5,
  },
  searchText: {
    color: "#777170",
    fontWeight: "100",
    fontSize: 13,
  },
  stretch: {
    width: 35,
    height: 35,
  },
});

LogBox.ignoreLogs(["Accessing the 'state'"]);
