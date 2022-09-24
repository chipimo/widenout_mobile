import { View, StyleSheet } from "react-native";
import React from "react";
import { Avatar, Button, ListItem, Text } from "@ui-kitten/components";
import moment from "moment";
import { GLOBALTYPES } from "../../../redux/globalTypes";
import { CommentIcon, FriendsIcon, LikeIcon } from "./icons";

const NotificationList = (props: any) => {
  const { image, time, first_name, last_name, type, read, child } = props.item;

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderItemAccessory = (props) => {
    switch (type) {
      case "5":
        null;
        break;
        {
          /* <Button size="tiny">FOLLOW</Button> */
        }
      default:
        return null;
    }
  };

  const renderItemIcon = (props) => {
    switch (type) {
      case "1":
        return (
          <View>
            <Avatar
              size="giant"
              source={{ uri: GLOBALTYPES.imageLink + image }}
            />
            <View style={styles.iconButton3}>
              <CommentIcon />
            </View>
          </View>
        );
      case "2":
        return (
          <View>
            <Avatar
              size="giant"
              source={{ uri: GLOBALTYPES.imageLink + image }}
            />
            <View style={styles.iconButton}>
              <LikeIcon />
            </View>
          </View>
        );
      case "5":
        return (
          <View>
            <Avatar
              size="giant"
              source={{ uri: GLOBALTYPES.imageLink + image }}
            />
            <View style={styles.iconButton2}>
              <FriendsIcon />
            </View>
          </View>
        );

      default:
        return (
          <View>
            <Avatar
              size="giant"
              source={{ uri: GLOBALTYPES.imageLink + image }}
            />
            <View style={styles.iconButton}>
              <LikeIcon />
            </View>
          </View>
        );
    }
  };

  const renderItemTitle = (props) => {
    switch (type) {
      case "1":
        return (
          <View style={styles.text}>
            <Text category="h6">{`${Capitalize(
              first_name
            )} ${last_name}`}</Text>
            <Text category="s1">Commented on your post</Text>
          </View>
        );
      case "2":
        return (
          <View style={styles.text}>
            <Text category="h6">{`${Capitalize(
              first_name
            )} ${last_name}`}</Text>
            <Text category="s1">Liked your post</Text>
          </View>
        );
      case "5":
        return (
          <View style={styles.text}>
            <Text category="h6">{`${Capitalize(
              first_name
            )} ${last_name}`}</Text>
            <Text category="s1">Accepted your friend request</Text>
          </View>
        );

      default:
        return (
          <View style={styles.text}>
            <Text category="h6">{`${Capitalize(
              first_name
            )} ${last_name}`}</Text>
          </View>
        );
        break;
    }
  };

  return (
    <ListItem
      style={{ backgroundColor: read === "0" ? "#DAE8F2" : "transparent" }}
      title={renderItemTitle}
      description={moment(time).fromNow()}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    paddingLeft: 5,
  },
  container: {
    flexDirection: "row",
    // maxHeight: 200,
  },
  iconButton: {
    textAlign: "center",
    backgroundColor: "#1656AA",
    width: 30,
    height: 30,
    padding: 5,
    borderRadius: 50,
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 0,
  },
  iconButton2: {
    textAlign: "center",
    backgroundColor: "#EB6424",
    width: 30,
    height: 30,
    padding: 5,
    borderRadius: 50,
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 0,
  },
  iconButton3: {
    textAlign: "center",
    backgroundColor: "#982A21",
    width: 30,
    height: 30,
    padding: 5,
    borderRadius: 50,
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 0,
  },
});

export default NotificationList;
