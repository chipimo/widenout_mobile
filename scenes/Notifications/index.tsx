import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Divider, List, ListItem, Button } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import { useGetNotificationsMutation } from "../../services/fetch.user.service";
import NotificationList from "./extra/notification.list";

const Notifications = () => {
  const data = new Array(28).fill({
    title: "Item",
    description: "Description for Item",
  });

  const [notiList, setNotiList] = React.useState([]);
  const [onRefreshing, setOnRefreshing] = React.useState(false);
  const [notificationsCall, { isLoading, isError, status, error }] =
    useGetNotificationsMutation();
  const { user } = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getNotify();
  }, []);

  const getNotify = async () => {
    setOnRefreshing(true);
    let id = user.idu;

    const List = await notificationsCall({ id }).unwrap();
    // console.log(List);
    setOnRefreshing(false);

    setNotiList(List);
  };

  const renderFooterItem = () => (
    <Text style={{ textAlign: "center" }} appearance='hint'>Pull to refresh</Text>
  );

  return (
    <View>
      <View style={styles.text}>
        <Text category="h5">Notifications</Text>
        {/* <Button onPress={getNotify}>get noti</Button> */}
      </View>
      <List
        style={styles.container}
        data={notiList}
        ItemSeparatorComponent={Divider}
        renderItem={NotificationList}
        onRefresh={() => getNotify()}
        refreshing={onRefreshing}
        ListFooterComponent={renderFooterItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 10,
  },
  container: {
    // maxHeight: 200,
  },
});

export default Notifications;
