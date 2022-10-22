import React from "react";
import {
  ImageBackground,
  Platform,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Avatar,
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingView } from "../extra/keyboard-avoiding-view.component";
import { RootState } from "../../redux/configureStore";
import { GroupCard } from "./extra/card";
import { useGetGroupsMutation } from "../../services/fetch.user.service";

const keyboardOffset = (height: number): number =>
  Platform.select({
    android: 0,
    ios: height,
  });

export default ({ navigation }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [groupCards, setGroupCards] = React.useState([]);
  const [groups, { isLoading, isError, status, error }] =
    useGetGroupsMutation();
  const { user } = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let uid = user.idu;

    const groupsList = await groups({ uid }).unwrap();
    setGroupCards(groupsList);
    // dispatch(userFeeds(feed));
  };

  return (
    <KeyboardAvoidingView style={styles.container} offset={keyboardOffset}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {groupCards.map((list, index) => (
          <GroupCard key={index} navigate={navigation} items={list} />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-4",
    paddingBottom: 8,
  },
});
