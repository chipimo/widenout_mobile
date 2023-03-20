import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import AnimatedLoader from "react-native-animated-loader";

const SignUpScreen = ({ navigation }): React.ReactElement => {
  const [loading, setLoading] = React.useState(true);

  return (
    <WebView
      startInLoadingState={true}
      source={{
        uri: "http://192.168.43.130/wnoweb//index.php?a=register&finito_registo",
      }}
      onMessage={(e) => {
        if (e.nativeEvent.data === "registered") {
          navigation.navigate("SignIn");
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
              height: 100,
            }}
            speed={1}
          >
            <Text>Getting SingUp Page...</Text>
          </AnimatedLoader>
        );
      }}
    />
  );
};

export default SignUpScreen;
