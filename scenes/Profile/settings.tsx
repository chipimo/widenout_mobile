import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import AnimatedLoader from "react-native-animated-loader";

const SettingsScreen = ({ navigation }): React.ReactElement => {
  const [loading, setLoading] = React.useState(true);

  return (
    <WebView
      startInLoadingState={true}
      source={{
        uri: "https://jw-widenout.com//index.php?a=settings",
      }}
      onMessage={(e) => {
        if (e.nativeEvent.data === "updated") {
          navigation.goBack();
        }
      }}
      cacheEnabled={false}
      originWhitelist={["*"]}
      javaScriptEnabled={true}
      // source={{ uri: "https://jw-widenout.com//index.php?a=register" }}
      renderLoading={() => {
        return (
          <AnimatedLoader
            visible={loading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("../../assets/lottiefiles/infinite-scroll-loader.json")}
            animationStyle={{
              width: 100,
              height: 60,
            }}
            speed={1}
          >
            <Text>Please wait...</Text>
          </AnimatedLoader>
        );
      }}
    />
  );
};

export default SettingsScreen;
