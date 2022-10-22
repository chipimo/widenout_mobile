import React, { useRef } from "react";
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
  Divider,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  List,
} from "@ui-kitten/components";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { KeyboardAvoidingView } from "./extra/keyboard-avoiding-view.component";
import { CommentList } from "./extra/comment-list.component";
import {
  CameraIcon,
  Joined,
  LeaveIcon,
  PeopleIcon,
  VideoIcon,
} from "./extra/icons";
import {
  useGetGroupFeedsMutation,
  useGetGroupMembersMutation,
  useGetGroupMemberDataMutation,
} from "../../services/fetch.user.service";
import { useDispatch, useSelector } from "react-redux";
import { userFeeds } from "../../redux/features/feeds";
import { RootState } from "../../redux/configureStore";
import { GLOBALTYPES } from "../../redux/globalTypes";

const keyboardOffset = (height: number): number =>
  Platform.select({
    android: 0,
    ios: height,
  });

export default ({ navigation }): React.ReactElement => {
  const bottomSheet = useRef();
  const styles = useStyleSheet(themedStyles);
  const [getGroupFeeds, { isLoading, isError, status, error }] =
    useGetGroupFeedsMutation();
  const [getGroupMembers] = useGetGroupMembersMutation();
  const [getGroupMemberData] = useGetGroupMemberDataMutation();
  const { list } = useSelector((state: RootState) => state.user.feeds);
  const [groupComments, setGroupComments] = React.useState([]);
  const [groupMembers, setGroupMembers] = React.useState([]);
  const [groupMemberData, setGroupMemberData] = React.useState(false);
  const { user } = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();

  const state = navigation.getState();
  const { title, privacy, posts, members, description, id, cover } =
    state.routes[1].params;

  React.useEffect(() => {
    getFeeds();
    getGroupMembersFunc();
    getGroupMemberDataFunc();
  }, []);

  const getFeeds = async () => {
    let group_id = id;

    const groupFeed = await getGroupFeeds({ group_id }).unwrap();
    setGroupComments(groupFeed);
  };

  const getGroupMembersFunc = async () => {
    let group_id = id;

    const groupMembers = await getGroupMembers({ group_id }).unwrap();
    setGroupMembers(groupMembers);
    console.log(groupMembers);
  };

  const getGroupMemberDataFunc = async () => {
    let group_id = id;
    let user_id = user.idu;

    const groupMember = await getGroupMemberData({
      group_id,
      user_id,
    }).unwrap();
    if (groupMember) setGroupMemberData(groupMember);
  };

  const renderItem = (info: any): React.ReactElement => (
    <View style={{ flexDirection: "row", padding: 5 }}>
      <Avatar source={{ uri: GLOBALTYPES.imageLink + info.item.image }} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PostUserProfile", {
            userId: info.item.idu,
          })
        }
        style={styles.commentAuthorContainer}
      >
        <Text category="h6">
          {info.item.first_name + " " + info.item.last_name}
        </Text>
        <Text appearance="hint" category="c1">
          {info.item.email}
        </Text>
        {info.item.country ? (
          <Text appearance="hint" category="c1">
            ({info.item.country})
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );

  const renderHeader = (): React.ReactElement => (
    <Layout style={styles.header} level="1">
      <View>
        <ImageBackground
          source={{ uri: GLOBALTYPES.coversLink + cover }}
          resizeMode="cover"
          style={styles.image}
        ></ImageBackground>
        <Divider />
        <View style={styles.headerText}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text} category="h6">
                  {title}
                </Text>
                <View
                  style={{ flexDirection: "row", marginLeft: 10, marginTop: 2 }}
                >
                  <Text style={styles.text} appearance="hint">
                    {groupMembers.length != 1
                      ? `${groupMembers.length} members`
                      : `${groupMembers.length} member`}
                  </Text>
                </View>
              </View>
              <Text style={styles.text}>{description}</Text>
            </View>

            <View style={{ width: "40%", marginTop: 5 }}>
              {groupMemberData ? (
                <Button
                  size="tiny"
                  disabled={false}
                  onPress={() => {
                    getFeeds();
                  }}
                  accessoryLeft={Joined}
                >
                  {"Leave Group"}
                </Button>
              ) : (
                <Button
                  size="tiny"
                  disabled={false}
                  onPress={() => {
                    getFeeds();
                  }}
                  accessoryLeft={LeaveIcon}
                >
                  {"Join Group"}
                </Button>
              )}
            </View>
          </View>
        </View>
        <Divider />
        <View>
          <View style={styles.cardIconsList}>
            <Button
              onPress={() => bottomSheet.current.show()}
              style={styles.iconButton}
              appearance="ghost"
              status="basic"
              accessoryRight={PeopleIcon}
            >
              <Text>Members</Text>
            </Button>

            <Button
              onPress={getFeeds}
              style={styles.iconButton}
              appearance="ghost"
              status="basic"
              accessoryRight={PeopleIcon}
            >
              <Text>Admins</Text>
            </Button>

            {/* Members */}
            <BottomSheet hasDraggableIcon ref={bottomSheet} height={470}>
              <List
                style={{ margin: 10, padding: 10 }}
                data={groupMembers}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
              />
            </BottomSheet>
          </View>
        </View>
        <Divider />
        <Divider />
      </View>
      <Text style={styles.descriptionLabel} category="s1">
        Post in {title}
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
        data={groupComments}
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
  commentAuthorContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  cardIconsList: {
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  text: {
    margin: 2,
  },
  headerText: {
    padding: 2,
    paddingLeft: 10,
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
