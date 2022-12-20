import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/configureStore";
import { useGetPendingFriendsMutation } from "../../../services/fetch.user.service";
import { FriendsCard } from "./extra/card";
import { FlatGrid } from "react-native-super-grid";
import { StyleSheet, Text, View } from "react-native";

const PendingFriendRequest = ({ navigation }) => {
  const [getPendingFriends, { isLoading, isError, status, error }] =
    useGetPendingFriendsMutation();
  const [friends, friendsList] = React.useState([]);
  const { user } = useSelector((state: RootState) => state.user.user);
  const { loading } = useSelector((state: RootState) => state.user.load_action);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getPendingFriendList();
  }, [loading]);

  const getPendingFriendList = async () => {
    // @ts-ignore
    let user_id = user.idu;

    const List = await getPendingFriends({ user_id }).unwrap();
    friendsList(List);
  };

  return (
    <FlatGrid
      itemDimension={130}
      style={styles.container}
      data={friends}
      renderItem={({ item }) => <FriendsCard navigation={navigation} item={item} />}
    />
  );
};

export default PendingFriendRequest;

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
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    flexDirection: "row",
  },
});
