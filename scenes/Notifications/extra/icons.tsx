import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';
import { AntDesign } from '@expo/vector-icons';  
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';

export const FriendsIcon = (style: ImageStyle): IconElement => (
  <Entypo {...style} name="users" size={19} color="#fff" />
);

export const LikeIcon = (style: ImageStyle): IconElement => (
  <AntDesign {...style} name="like1" size={19} color="#fff" />
);

export const ClockIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='clock'/>
);

export const HeartIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='heart'/>
);

export const CommentIcon = (style: ImageStyle): IconElement => (
  <FontAwesome {...style} name="commenting" size={19} color="#fff" />
);

export const MessageCircleIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='message-square-outline'/>
);

export const MoreHorizontalIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='more-horizontal'/>
);

export const CameraIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='camera-outline'/>
);

export const VideoIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='video-outline'/>
);

export const ImageIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='image-outline'/>
);

export const Joined = (style: ImageStyle): IconElement => (
  <Icon {...style} name='person-done-outline'/>
);

