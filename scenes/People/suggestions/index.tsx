import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/configureStore";
import { useGetPeopleMutation } from "../../../services/fetch.user.service";
import { Button, List } from "@ui-kitten/components";
import { PeopleCard } from "./extra/card";
import { FlatGrid } from "react-native-super-grid";

const Suggestion = ({ navigation }): React.ReactElement => {
  const [circleAnimatedValue, setCircleAnimatedValue] = React.useState(
    new Animated.Value(0)
  );
  const [getPeople] =
    useGetPeopleMutation();
  const [people, peopleList] = React.useState([]);
  const { user } = useSelector((state: RootState) => state.user.user);
  const { loading } = useSelector((state: RootState) => state.user.load_action);

  const dispatch = useDispatch();

  React.useEffect(() => {
    circleAnimated();
    getFriendList();
  }, [loading]);

  const getFriendList = async () => {
    let user_id = user.idu;

    const List = await getPeople({ user_id }).unwrap();
    peopleList(List);
  };

  const circleAnimated = () => {
    // setCircleAnimatedValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(circleAnimatedValue, {
          toValue: 1,
          duration: 450,
          delay: 200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const translateX = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  const translateX2 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 200],
  });
  const translateX3 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 90],
  });

  const Loader = () => (
    <View style={[{ marginBottom: 8 }, styles.card]}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 60,
          backgroundColor: "#ECEFF1",
          overflow: "hidden",
          marginRight: 16,
        }}
      >
        <Animated.View
          style={{
            width: "30%",
            opacity: 0.5,
            height: "100%",
            backgroundColor: "white",
            transform: [{ translateX: translateX }],
          }}
        ></Animated.View>
      </View>
      <View
        style={{ flex: 1, justifyContent: "space-evenly", overflow: "hidden" }}
      >
        <Animated.View style={{ backgroundColor: "#ECEFF1", height: 32 }}>
          <Animated.View
            style={{
              width: "20%",
              height: "100%",
              backgroundColor: "white",
              opacity: 0.5,
              transform: [{ translateX: translateX2 }],
            }}
          ></Animated.View>
        </Animated.View>
        <View style={{ backgroundColor: "#ECEFF1", height: 32 }}>
          <Animated.View
            style={{
              width: "20%",
              height: "100%",
              backgroundColor: "white",
              opacity: 0.5,
              transform: [{ translateX: translateX2 }],
            }}
          ></Animated.View>
        </View>
      </View>
    </View>
  );

  return (
    <FlatGrid
      itemDimension={130}
      style={styles.container}
      data={people}
      renderItem={({ item }) => <PeopleCard navigation={navigation} item={item} />}
    />
  );
};

export default Suggestion;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#ECEFF1",
    paddingBottom: 44,
  },
  card: {
    padding: 16,
    shadowColor: "black",
    borderRadius: 4,
    backgroundColor: "#FAFAFA",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    flexDirection: "row",
  },
});
