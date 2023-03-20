import React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Card,
  CardElement,
  CardProps,
  Text,
} from "@ui-kitten/components";
import { ImageOverlay } from "./image-overlay.component";
import { ClockIcon } from "./icons";
import { GLOBALTYPES } from "../../../redux/globalTypes";

export const GroupCard = (props: any): CardElement => {
  const { navigate } = props.navigate;
  const { cover, title, description, members } = props.items;

  React.useEffect(() => {
    console.log(props);
  }, []);

  return (
    <Card onPress={() => navigate("GroupDiscussion", { ...props.items })} style={styles.container}>
      <ImageOverlay
        style={styles.image}
        source={{ uri: GLOBALTYPES.coversLink + cover }}
      >
        <Text style={styles.level} category="h4" status="control">
          {title}
        </Text>
        <Text style={styles.level} category="s1" status="control">
          {members != 1 ? `${members} members` : `${members} member`}
        </Text>
        <Text style={styles.title} category="s1" status="control">
          {description}
        </Text>
        <Button
          style={styles.durationButton}
          size="tiny"
          onPress={() => navigate("GroupDiscussion", { ...props.items })}
          accessoryLeft={ClockIcon}
        >
          {"Open group feeds"}
        </Button>
      </ImageOverlay>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  level: {
    zIndex: 1,
    color: "#fff",
  },
  title: {
    zIndex: 1,
    color: "#fff",
  },
  durationButton: {
    position: "absolute",
    left: 16,
    bottom: 16,
    borderRadius: 16,
    paddingHorizontal: 0,
  },
});
