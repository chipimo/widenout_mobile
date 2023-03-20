import React, { ReactElement, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Divider,
  Drawer,
  DrawerItem,
  DrawerElement,
  Layout,
  Text,
  IndexPath,
} from "@ui-kitten/components";
import {
  GroupIcon,
  LogoutIcon,
  NotificationsIcon,
  UserIcon,
} from "./icons";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaLayout } from "./safe-area-layout.component";
import { RootState } from "../redux/configureStore";
import { userLoggedOut } from "../redux/features/auth/userAuth";
import { GLOBALTYPES } from "../redux/globalTypes";

export const HomeDrawer = ({ navigation }): DrawerElement => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(null);
  const { user } = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  //   const UserInfo = user[0];

  React.useEffect(() => {
    // console.log(user);
  }, []);

  const DATA = [
    {
      title: "Profile",
      icon: UserIcon,
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate("PostUserProfile", {
          userId: user.idu,
        });
      },
    },
    // {
    //   title: "Settings",
    //   icon: SettingsIcon,
    //   onPress: () => {
    //     navigation.toggleDrawer();
    //     navigation.navigate("Libraries");
    //   },
    // },
    {
      title: "Notifications",
      icon: NotificationsIcon,
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate("Notifications");
      },
    },
    {
      title: "Groups",
      icon: GroupIcon,
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate("Groups");
      },
    },
    // {
    //   title: "Theme",
    //   icon: ThemeIcon,
    //   onPress: () => {
    //     navigation.toggleDrawer();
    //     navigation.navigate("Theme");
    //   },
    // },
    {
      title: "Logout",
      icon: LogoutIcon,
      onPress: () => {
        navigation.toggleDrawer();
        dispatch(userLoggedOut({}));
      },
    },
  ];

  const renderHeader = (): ReactElement => (
    <SafeAreaLayout insets="top" level="2">
      <Layout style={styles.header} level="2">
        <View style={styles.profileContainer}>
          <View style={styles.userInfoContainer}>
            <Avatar
              size="giant"
              source={{ uri: GLOBALTYPES.imageLink + user.image }}
            />
            <View>
              <Text style={styles.profileName} category="h6">
                {user.username}
              </Text>
              <Text style={styles.profileName} appearance="hint">
                {user.first_name} {user.last_name}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={styles.profileName} appearance="hint">
              {user.email}
            </Text>
          </View>
        </View>
      </Layout>
    </SafeAreaLayout>
  );

  const renderFooter = () => (
    <SafeAreaLayout insets="bottom">
      <React.Fragment>
        <Divider />
        <View style={styles.footer}>
          <Text>Widen out</Text>
        </View>
      </React.Fragment>
    </SafeAreaLayout>
  );

  return (
    <Drawer
      header={renderHeader}
      footer={renderFooter}
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      {DATA.map((el, index) => (
        <DrawerItem
          key={index}
          title={el.title}
          onPress={el.onPress}
          accessoryLeft={el.icon}
        />
      ))}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 16,
  },
  profileContainer: {},
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginHorizontal: 16,
  },
});
