import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { SafeAreaLayout } from "../../components/safe-area-layout.component";
import {
  ArrowIosBackIcon,
  BookmarkIcon,
  BookmarkOutlineIcon,
} from "../../components/icons";
import { HideTopBar, ShowTopBar } from "../../redux/features/drawer/showTopBar";
import ContentView from "./contentView";

export interface UserProfile {
  userId: string;
  navigation: any;
}

const UserProfile = (props: UserProfile) => {
  const { userId, navigation } = props;
  const state = navigation.getState();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(HideTopBar(""));

    return () => {
      dispatch(ShowTopBar(""));
    };
  }, []);

  const onBookmarkActionPress = (): void => {};

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction style={{ padding:8}} icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const renderBookmarkAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={BookmarkOutlineIcon}
      onPress={onBookmarkActionPress}
    />
  );

  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation
        title="Profile"
        accessoryLeft={renderBackAction}
        accessoryRight={renderBookmarkAction}
      />
      <ContentView id={state.routes[1].params.userId} navigation={navigation} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserProfile;
