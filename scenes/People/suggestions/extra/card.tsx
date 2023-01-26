import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  CardElement,
  CardProps,
  Text,
} from "@ui-kitten/components";
import { ImageOverlay } from "./image-overlay.component";
import { GLOBALTYPES } from "../../../../redux/globalTypes";
import { useSetFriendMutation } from "../../../../services/fetch.user.service";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/configureStore";
import { start_load } from "../../../../redux/features/sync/load_action";
import { end_load } from "../../../../redux/features/sync/load_action";

export const PeopleCard = (props: any): CardElement => {
  const { style, training, item, navigation, ...cardProps } = props;
  const { user } = useSelector((state: RootState) => state.user.user);
  const [setFriend, { isLoading, isError, status, error }] =
    useSetFriendMutation();
  const [loader_id, setLoader_id] = React.useState();
  const dispatch = useDispatch();

  React.useEffect(() => {
    // console.log(item)
  }, []);

  const addFriend_ = async (friend_to_be) => {
    setLoader_id(friend_to_be);
    dispatch(start_load(true));

    let user_id = user.idu;

    await setFriend({
      friend_to_be: friend_to_be,
      user_id: user_id,
    }).unwrap();

    setLoader_id(null);
    dispatch(end_load(false));
  };

  return (
    <View style={[styles.container, style]}>
      <View style={{ width: "100%", height: "30%" }}>
        <ImageOverlay
          source={{ uri: GLOBALTYPES.coversLink + item.cover }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.avatar_container}>
        <Avatar
          style={styles.avatar}
          size="giant"
          source={{ uri: GLOBALTYPES.imageLink + item.image }}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: "30%",
          marginTop: 50,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PostUserProfile", {
              userId: item.idu,
            })
          }
          // style={styles.commentAuthorContainer}
        >
          <Text style={styles.text} category="h6">
            {`${item.first_name} ${item.last_name}`}
          </Text>
        </TouchableOpacity>
        <Text style={styles.text} category="h6">
          {`${item.bio}`}
        </Text>
        <Text style={styles.text} category="h6">
          {`${item.location}`}
        </Text>
      </View>
      <View style={{ width: "100%", marginTop: 1, alignItems: "center" }}>
        <Button
          disabled={item.idu == loader_id ? true : false}
          onPress={() => addFriend_(item.idu)}
          size="tiny"
          appearance="outline"
        >
          {item.idu == loader_id ? "Sending request" : "Add To Friends"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 230,
    padding: 0,
    margin: 0,
    borderColor: "#ccc",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  level: {
    zIndex: 1,
  },
  title: {
    zIndex: 1,
  },
  text: {},
  avatar_container: {
    position: "absolute",
    zIndex: 1,
    marginTop: 6,
    marginLeft: 40,
  },
  avatar: {
    margin: 8,
    height: 90,
    width: 90,
  },
  durationButton: {
    position: "absolute",
    left: 16,
    bottom: 16,
    borderRadius: 16,
    paddingHorizontal: 0,
  },
});
