import React from "react";
import { ImageStyle } from "react-native";
import { Icon, IconElement } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const HeartIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="heart" />
);

export const MessageCircleIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="message-square-outline" />
);

export const SettingsIcon = (style: ImageStyle): IconElement => (
  <Icon
    {...style}
    width={28}
    height={28}
    fill={"#777170"}
    name="settings"
  />
);

export const MoreHorizontalIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="more-horizontal" />
);

export const CameraIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="camera-outline" />
);

export const SlashIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="slash-outline" />
);

export const HandPointerIcon = (style: ImageStyle): IconElement => (
  <MaterialCommunityIcons
    name="hand-pointing-right"
    size={24}
    color="#3363FF"
  />
);

export const VideoIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="video-outline" />
);

export const ImageIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="image-outline" />
);
