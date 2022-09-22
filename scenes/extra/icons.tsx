import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

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

export const VideoIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='video-outline'/>
);

export const ImageIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='image-outline'/>
);

