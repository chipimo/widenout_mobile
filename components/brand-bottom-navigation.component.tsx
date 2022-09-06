import React from "react";
import {
  BottomNavigation,
  BottomNavigationProps,
  ThemeProvider,
} from "@ui-kitten/components";

export const BrandBottomNavigation = (
  props: BottomNavigationProps
): React.ReactElement => {
  return <BottomNavigation {...props} />;
};
