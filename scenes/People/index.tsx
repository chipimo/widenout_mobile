import React from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Friends from "./friends";
import PendingFriendRequest from "./pending";
import Suggestion from "./suggestions";


const People = ({ navigation }): React.ReactElement => {
  const layout = useWindowDimensions();
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "suggestion", title: "Suggestion" },
    { key: "pending_friend_request", title: "Pending" },
  ]);
  
  const SuggestionScene = () => (
    <Suggestion navigation={navigation} />
  );

  const renderScene = SceneMap({
    suggestion: SuggestionScene,
    //   friends: Friends,
    pending_friend_request: PendingFriendRequest,
  });

  const [navigationState, setNavigationState] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const [xTabOne, setXTabOne] = React.useState(0);
  const [xTabTwo, setXTabTwo] = React.useState(0);
  const [translateX, setTranslateX] = React.useState(new Animated.Value(0));

  const handleSlide = (type) => {
    Animated.spring(translateX, {
      toValue: type,
      speed: 100,
      bounciness: 100,
      useNativeDriver: true,
    }).start();
  };

  const _TabBar = (props: any) => {
    setActive(props.navigationState.index);
    if (props.navigationState.index === 0) handleSlide(xTabOne);
    else handleSlide(xTabTwo);

    return (
      <View
        style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 20,
            height: 36,
          }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateX,
                },
              ],
              position: "absolute",
              width: "50%",
              height: "100%",
              top: 0,
              left: 0,
              backgroundColor: "#007aff",
              borderRadius: 4,
            }}
          />
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#007aff",
              borderRadius: 4,
              borderRightWidth: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            onLayout={(event) => setXTabOne(event.nativeEvent.layout.x)}
            onPress={() => {
              setIndex(0);
              handleSlide(xTabOne);
              setNavigationState(props.navigationState);
            }}
          >
            <Text style={{ color: active === 0 ? "white" : "black" }}>
              Suggestion
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#007aff",
              borderRadius: 4,
              borderLeftWidth: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onLayout={(event) => setXTabTwo(event.nativeEvent.layout.x)}
            onPress={() => {
              setIndex(1);
              handleSlide(xTabTwo);
              setNavigationState(props.navigationState);
            }}
          >
            <Text style={{ color: active === 1 ? "white" : "black" }}>
              Pending
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <TabView
      style={{ backgroundColor: "white" }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => _TabBar(props)}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default People;

const styles = StyleSheet.create({});
