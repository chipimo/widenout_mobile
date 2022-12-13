import { Image, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  Layout,
  StyleService,
  useStyleSheet,
  Text,
  Input,
  Button,
  Menu,
  MenuItem,
  Spinner,
} from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import {
  useFeedsMutation,
  usePost_feedMutation,
} from "../../services/fetch.user.service";
import { CameraIcon, ImageIcon } from "./extra/icons";
import { GLOBALTYPES } from "../../redux/globalTypes";
import { refreshDone, refreshFeeds } from "../../redux/features/feeds/refresh";
import { userFeeds } from "../../redux/features/feeds";
import { RootState } from "../../redux/configureStore";

const useInputState = (initialValue = "") => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const PostStatus = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const multilineInputState = useInputState();
  const dispatch = useDispatch();
  const [post_feeds, { isLoading, isError, status, error }] =
    usePost_feedMutation();
  const [message, setMessage] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [img, setImg] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [group_id, setGroup_id] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { user } = useSelector((state: RootState) => state.user.user);

  const [pickedImagePath, setPickedImagePath] = React.useState(null);
  const [feeds] = useFeedsMutation();

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ base64:true });

    // Explore the result
    // console.log(result);
    setImg(result.base64);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      // console.log(result.uri);
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    // console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      // console.log(result.uri);
    }
  };

  const getFeeds = async () => {
    setLoading(true);

    let uuid =  user.idu;

    const feed = await post_feeds({ message, tag, img, group_id, uuid }).unwrap();

    if (feed === "Posted") {
      dispatch(refreshFeeds);

      let user_id =  user.idu;

      const feedList = await feeds({ user_id }).unwrap();

      dispatch(userFeeds(feedList));
      dispatch(refreshDone);

      setTimeout(() => {
        navigation.goBack();
      }, 900);
    }
  };

  return (
    <Layout style={styles.container} level="1">
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ marginTop: 10, marginLeft: 10 }}>
          <Text>Create Post</Text>
        </View>
      </View>
      <View>
        <TextInput
          style={styles.commentInput}
          onChangeText={(msgValue) => setMessage(msgValue)}
          value={message}
          placeholder="Write Post"
          numberOfLines={4}
        />

        {/* <Input
          multiline={true}
          textStyle={{ minHeight: 104 }}
          {...multilineInputState}
        /> */}
      </View>

      <View>
        {pickedImagePath ? (
          <Image
            source={{ uri: pickedImagePath }}
            style={{ width: 200, height: 200 }}
          />
        ) : null}
      </View>

      <View style={styles.cardIconsList}>
        <Menu
          selectedIndex={selectedIndex}
          onSelect={(index) => {
            setSelectedIndex(index);
            if (index.row === 0) showImagePicker();
            else openCamera();
          }}
        >
          <MenuItem title="Add Photo" accessoryLeft={ImageIcon} />
          <MenuItem title="Camera" accessoryLeft={CameraIcon} />
        </Menu>
      </View>

      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Button
          disabled={loading}
          accessoryLeft={loading ? LoadingIndicator : null}
          onPress={getFeeds}
          status="info"
        >
          POST
        </Button>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
    paddingBottom: 8,
  },
  input: {
    padding: 15,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  cardIconsList: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    padding: 5,
    borderColor: "background-basic-color-4",
    borderWidth: 1,
    borderRadius: 5,
  },
  header: {
    padding: 8,
    flexDirection: "row",
    borderColor: "background-basic-color-4",
    borderWidth: 1,
  },
  commentInput: {
    backgroundColor: "background-basic-color-3",
    borderColor: "background-basic-color-4",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 4,
    marginTop: 2,
    marginBottom: 2,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostStatus;
