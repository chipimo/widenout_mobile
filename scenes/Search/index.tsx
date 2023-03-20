import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaLayout } from "../../components/safe-area-layout.component";
import {
  Avatar,
  Divider,
  Layout,
  List,
  ListItem,
  Text,
} from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import { GLOBALTYPES } from "../../redux/globalTypes";

const Search = ({ navigation }): React.ReactElement => {
  const [people, peopleList] = React.useState([]);
  const { search_list } = useSelector(
    (state: RootState) => state.user.search__
  );

  React.useEffect(() => {
    console.log(search_list);
  }, []);

  const renderItemIcon = (props) => {
    console.log(props);
    
    return (
      <Avatar
        source={{ uri: GLOBALTYPES.imageLink + props.image }}
        size="giant"
      />
    );
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      onPress={() =>
        navigation.navigate("PostUserProfile", {
          userId: item.idu,
        })
      }
      accessoryLeft={()=>renderItemIcon(item)}
      title={`${item.first_name} ${item.last_name}`}
      description={`${item.description} ${index + 1}`}
    />
  );

  return (
    <SafeAreaLayout style={styles.container} insets="top" level="2">
      <View style={styles.layout}>
        <List
          data={search_list}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    padding: 10,
  },
  commentAuthorContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default Search;
