import React from "react";
import {
  ImageBackground,
  Platform,
  View,
  TouchableOpacity,
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
import { KeyboardAvoidingView } from "./extra/keyboard-avoiding-view.component";
import { CommentList } from "./extra/comment-list.component";
import { CameraIcon, VideoIcon } from "./extra/icons";
import { useFeedsMutation } from "../../services/fetch.user.service";
import { useDispatch, useSelector } from "react-redux";
import { userFeeds } from "../../redux/features/feeds";
import { RootState } from "../../redux/configureStore";
import { refreshDone, refreshFeeds } from "../../redux/features/feeds/refresh";

const keyboardOffset = (height: number): number =>
  Platform.select({
    android: 0,
    ios: height,
  });

export default ({ navigation }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [inputComment, setInputComment] = React.useState<string>();
  const [feeds, { isLoading, isError, status, error }] = useFeedsMutation();
  const { list } = useSelector((state: RootState) => state.user.feeds);
  const { refresh } = useSelector(
    (state: RootState) => state.user.refreshFeeds
  );
  const { user } = useSelector((state: RootState) => state.user.user);
  
  const dispatch = useDispatch();

  React.useEffect(() => {
    getFeeds();
  }, [refresh]);

  const getFeeds = async () => {
    dispatch(refreshFeeds);
    let user_id =  user.idu;

    const feed = await feeds({ user_id }).unwrap();

    dispatch(userFeeds(feed));
    dispatch(refreshDone);
  };

  const renderHeader = (): React.ReactElement => (
    <Layout style={styles.header} level="1">
      <Text style={styles.descriptionLabel} category="s1">
        Update your status 
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("PostStatus")}>
        {/* <Avatar source={require("../../../assets/images/20210507_164638.jpg")} /> */}
        <View style={styles.commentInput}>
          <Text appearance="hint">What's on your mind?</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.cardIconsList}>
        <Button
          onPress={getFeeds}
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={CameraIcon}
        />
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={VideoIcon}
        />
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={CameraIcon}
        />
      </View>
    </Layout>
  );

  return (
    <KeyboardAvoidingView style={styles.container} offset={keyboardOffset}>
      <CommentList
        navigation={navigation}
        style={styles.list}
        data={list}
        ListHeaderComponent={renderHeader()}
      />
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-4",
    paddingBottom: 8,
  },
  list: {
    backgroundColor: "background-basic-color-4",
    flex: 1,
  },
  cardIconsList: {
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  header: {
    marginBottom: 8,
    borderColor: "background-basic-color-4",
    borderWidth: 1,
  },
  image: {
    height: 240,
  },
  titleLabel: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  descriptionLabel: {
    margin: 24,
    marginBottom: 2,
  },
  contentLabel: {
    margin: 24,
  },
  authoringContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
  },
  dateLabel: {
    marginHorizontal: 8,
  },
  commentInputLabel: {
    fontSize: 16,
    marginBottom: 2,
    color: "text-basic-color",
  },
  commentInput: {
    backgroundColor: "background-basic-color-3",
    borderColor: "background-basic-color-4",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 24,
    marginTop: 2,
    marginBottom: 2,
  },
});
