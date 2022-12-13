import React from "react";
import { List, ListProps } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/configureStore";
import {
  refreshDone,
  refreshFeeds,
} from "../../../redux/features/feeds/refresh";
import CardList from "./cardList";
import { useFeedsMutation } from "../../../services/fetch.user.service";
import { userFeeds } from "../../../redux/features/feeds";

export type CommentListProps = Omit<ListProps, "renderItem">;

export const CommentList = (props: any): React.ReactElement => {
  const [onRefreshing, setOnRefreshing] = React.useState(false);
  const [feeds, { isLoading, isError, status, error }] = useFeedsMutation();
  const { refresh } = useSelector(
    (state: RootState) => state.user.refreshFeeds
  );
  const { user } = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const getFeeds = async () => {
    let user_id =  user.idu;

    const feed = await feeds({ user_id }).unwrap();

    dispatch(userFeeds(feed));
    dispatch(refreshDone);
  };

  return (
    <List
      onRefresh={() => {
        dispatch(refreshFeeds);
        getFeeds()
      }}
      refreshing={refresh}
      {...props}
      renderItem={(info) => (
        <CardList info={info} navigation={props.navigation} />
      )}
    />
  );
};
