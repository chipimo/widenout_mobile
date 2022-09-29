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
} from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { usePost_feedMutation } from "../../services/fetch.user.service";
import { CameraIcon, ImageIcon } from "./extra/icons";
import { GLOBALTYPES } from "../../redux/globalTypes";
import { refreshFeeds } from "../../redux/features/feeds/refresh";

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

  const [pickedImagePath, setPickedImagePath] = React.useState(null);

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    // console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      // console.log(result.uri);
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
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
    let uid = "3";
    const formData = new FormData();
    formData.append("file", pickedImagePath);

    // console.log(formData);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    
    const fileURL = await axios
      .post(`${GLOBALTYPES.apiEndPoint}/postFeeds.php`, formData, config)
      .then((response) => {
        const { data } = response;

        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });

    // const feed = await post_feeds(formData);
    // const feed = await post_feeds({ message, tag, img, group_id }).unwrap();
    dispatch(refreshFeeds)
    
    setTimeout(() => {
      navigation.goBack()
    }, 900);
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
        <Button onPress={getFeeds} status="info">
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
});

export default PostStatus;
