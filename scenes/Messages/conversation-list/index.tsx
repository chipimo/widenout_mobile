import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import {
  Input,
  Layout,
  List,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { MessageItem } from './extra/message-item.component';
import { SearchIcon } from './extra/icons';
import { Message } from './extra/data';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/configureStore";
import { useGetChatsMutation } from "../../../services/fetch.user.service";

export default ({ navigation }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [searchQuery, setSearchQuery] = React.useState<string>();
  const [chatListArray, setChatListArray] = React.useState<[]>();

  const [getChats] = useGetChatsMutation();
  const { user } = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getChatsFunc();
  }, []);

  const getChatsFunc = async () => {
    let uid = user.idu;

    const chatsList = await getChats({
      uid,
      cid: null,
      start: null,
      type: 1,
    }).unwrap();
    setChatListArray(chatsList);
  };

  const renderItem = (
    info: ListRenderItemInfo<Message>
  ): React.ReactElement => (
    <MessageItem
      style={styles.item}
      message={info.item}
      navigation={navigation}
    />
  );

  const renderHeader = (): React.ReactElement => (
    <Layout style={styles.header} level='1'>
      <Input
        placeholder='Search'
        value={searchQuery}
        accessoryRight={SearchIcon}
      />
    </Layout>
  );

  return (
    <List
      style={styles.list}
      data={chatListArray}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
    />
  );
};

const themedStyles = StyleService.create({
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
});
