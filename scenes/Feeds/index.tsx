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
import { Article } from "./extra/data";
import { CommentList } from "./extra/comment-list.component";
import { CameraIcon, VideoIcon } from "./extra/icons";
import { useFeedsMutation } from "../../services/fetch.user.service";

const data: Article = Article.howToEatHealthy();

const keyboardOffset = (height: number): number =>
  Platform.select({
    android: 0,
    ios: height,
  });

export default ({ navigation }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [inputComment, setInputComment] = React.useState<string>();
  const [feeds, { isLoading, isError, status, error }] = useFeedsMutation();

  React.useEffect(() => {
    getFeeds();
  }, []);

  const getFeeds = async () => {
    let uid = "2";
    const feed = await feeds({ uid }).unwrap();

    console.log(feed);
  };

  const renderHeader = (): React.ReactElement => (
    <Layout style={styles.header} level="1">
      <TouchableOpacity onPress={() => navigation.navigate("PostStatus")}>
        {/* <Avatar source={require("../../../assets/images/20210507_164638.jpg")} /> */}
        <Text style={styles.descriptionLabel} category="s1">
          Update your status
        </Text>
      </TouchableOpacity>

      <View style={styles.commentInput}>
        <Text appearance="hint">What's on your mind?</Text>
      </View>

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
        style={styles.list}
        data={data.comments}
        ListHeaderComponent={renderHeader()}
      />
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
    paddingBottom: 8,
  },
  list: {
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
