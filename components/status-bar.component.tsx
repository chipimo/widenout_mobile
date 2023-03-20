import React from "react";
import {
  StatusBar as RNStatusBar,
  StatusBarProps as RNStatusBarProps,
  ViewProps,
} from "react-native";

export type StatusBarProps = RNStatusBarProps; 

const TopStatusBar = (props): React.ReactElement<StatusBarProps> => {
  const { ...statusBarProps } = props;

  return <RNStatusBar barStyle="light-content" {...statusBarProps} />;
};

export default TopStatusBar;
