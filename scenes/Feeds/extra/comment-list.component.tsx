import React from "react";
import {
  List,
  ListProps,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/configureStore";
import { refreshFeeds } from "../../../redux/features/feeds/refresh";
import CardList from "./cardList";

export type CommentListProps = Omit<ListProps, "renderItem">;

export const CommentList = (props: any): React.ReactElement => {
  const [onRefreshing, setOnRefreshing] = React.useState(false);
  const { refresh } = useSelector(
    (state: RootState) => state.user.refreshFeeds
  );
  const dispatch = useDispatch();

  return (
    <List
      onRefresh={() => dispatch(refreshFeeds)}
      refreshing={refresh}
      {...props}
      renderItem={(info) => (
        <CardList info={info} navigation={props.navigation} />
      )}
    />
  );
};

