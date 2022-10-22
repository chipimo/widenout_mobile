import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const ClockIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='clock'/>
);

export const HeartIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='heart'/>
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

export const PeopleIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='people-outline'/> 
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

export const LeaveIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='person-delete-outline'/>
);

export const SendIcon = (style: ImageStyle): IconElement => (
  <Ionicons name="send" size={24} color="gray" />
);

export const DeleteIcon = (style: ImageStyle): IconElement => (
  <MaterialIcons name="delete-outline" size={24} color="black" />
);

export const EditIcon = (style: ImageStyle): IconElement => (
  <FontAwesome name="edit" size={24} color="black" />
);

export const Like1 = (style: ImageStyle): IconElement => (
  <AntDesign name="like1" size={20} color="black" />
);

export const Like1light = (style: ImageStyle): IconElement => (
  <AntDesign name="like1" size={20} color="gray" />
);

export const Like2 = (style: ImageStyle): IconElement => (
  <AntDesign name="like2" size={20} color="gray" />
);

export const Like2light = (style: ImageStyle): IconElement => (
  <AntDesign name="like2" size={20} color="gray" />
);