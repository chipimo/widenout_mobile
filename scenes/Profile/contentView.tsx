import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  List,
  ListProps,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import { Product, ProductOption } from "./extra/data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import { GLOBALTYPES } from "../../redux/globalTypes";
import {
  HandPointerIcon,
  HeartIcon,
  MessageCircleIcon,
  SlashIcon,
} from "./extra/icons";
import { useGetUserProfileMutation } from "../../services/fetch.user.service";

const product: Product = Product.centralParkApartment();

export interface UserProfile {
  id: string;
  navigation: object;
}

export default (props: UserProfile): React.ReactElement => {
  const { id } = props;
  const { user } = useSelector((state: RootState) => state.user.user);
  const [getUserProfile, { isLoading, isError, status, error }] =
    useGetUserProfileMutation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [profile, setProfile] = React.useState([]);
  const [cover, setCover] = React.useState("");
  const [image, setImage] = React.useState("");
  const [last_name, setLast_name] = React.useState("");
  const [first_name, setFirst_name] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [refresh, setRefresh] = React.useState(false);

  const dispatch = useDispatch();
  //   const UserInfo = user[0];

  React.useEffect(() => {
    // console.log(user);
    UserProfile();
  }, []);

  const UserProfile = async () => {
    setRefresh(true);
    let uid = id;

    const ProfileList = await getUserProfile({ uid }).unwrap();
    // console.log(ProfileList);

    if (ProfileList) {
      setProfile(ProfileList);
      setCover(ProfileList[0].cover);
      setImage(ProfileList[0].image);
      setLast_name(ProfileList[0].last_name);
      setFirst_name(ProfileList[0].first_name);
      setEmail(ProfileList[0].email);
      setCountry(ProfileList[0].country);
      setBio(ProfileList[0].bio);

      setRefresh(false);
    }
    // dispatch(userFeeds(feed));
  };

  const styles = useStyleSheet(themedStyles);

  const onBookButtonPress = (): void => {
    
  };

  const renderDetailItem = (
    detail: string,
    index: number
  ): React.ReactElement => {
    if (detail === "Block")
      return (
        <Button
          accessoryLeft={SlashIcon}
          key={index}
          status="danger"
          style={styles.detailItem}
          appearance="outline"
          size="tiny"
        >
          {detail}
        </Button>
      );
    else if (detail === "Message")
      return (
        <Button
          accessoryLeft={MessageCircleIcon}
          key={index}
          style={styles.detailItem}
          appearance="outline"
          size="tiny"
        >
          {detail}
        </Button>
      );
    else if (detail === "Poke")
      return (
        <Button
          accessoryLeft={HandPointerIcon}
          key={index}
          style={styles.detailItem}
          appearance="outline"
          size="tiny"
        >
          {detail}
        </Button>
      );
  };

  const renderBookingFooter = (): React.ReactElement => (
    <View>
      <View style={styles.detailsList}>
        {["Message", "Poke", "Block"].map(renderDetailItem)}
      </View>
    </View>
  );

  const renderHeader = (): React.ReactElement => (
    <View style={styles.container}>
      <ImageOverlay
        style={styles.image}
        source={{ uri: GLOBALTYPES.coversLink + cover }}
      />
      <Card
        style={styles.bookingCard}
        appearance="filled"
        disabled={true}
        footer={renderBookingFooter}
      >
        <Avatar size="giant" source={{ uri: GLOBALTYPES.imageLink + image }} />
        <Text style={styles.title} category="h6">
          {first_name} {last_name}
        </Text>
        <Text style={styles.rentLabel} appearance="hint" category="p2">
          {email}
        </Text>
        <Text>{country}</Text>
        <Button style={styles.bookButton} onPress={onBookButtonPress}>
          Add Friend
        </Button>
      </Card>
    </View>
  );

  const renderItem = (info: any): React.ReactElement => (
    <View style={styles.commentItem}>
      <View style={styles.postBody}>
        <Text>{info.item.message}</Text>
      </View>
      <View>
        {info.item.value !== "" ? (
          <Image
            resizeMode="contain"
            style={styles.stretch}
            source={{ uri: GLOBALTYPES.uploadsLink + info.item.value }}
          />
        ) : null}
      </View>
      <Divider />
      <View style={styles.commentReactionsContainer}>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={MessageCircleIcon}
        >
          {info.item.comments !== "0" ? `${info.item.comments}` : ``}
        </Button>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="danger"
          accessoryLeft={HeartIcon}
        >
          {`${info.item.likes.length}`}
        </Button>
      </View>
    </View>
  );

  return (
    <List
      data={profile}
      onRefresh={() => UserProfile()}
      refreshing={refresh}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader()}
    />
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-2",
  },
  image: {
    height: 260,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
  },
  title: {
    width: "65%",
  },
  rentLabel: {
    marginTop: 24,
  },
  priceLabel: {
    marginTop: 8,
  },
  bookButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  detailsList: {
    flexDirection: "row",
    marginHorizontal: -4,
    marginVertical: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  optionList: {
    flexDirection: "row",
    marginHorizontal: -4,
    marginVertical: 8,
  },
  optionItem: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  imagesList: {
    padding: 8,
    backgroundColor: "background-basic-color-2",
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  commentItem: {
    marginVertical: 4,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  commentHeader: {
    flexDirection: "row",
    padding: 16,
  },
  postBody: {
    marginHorizontal: 16,
    marginTop: 2,
    marginBottom: 2,
  },
  commentAuthorContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  commentReactionsContainer: {
    flexDirection: "row",
    padding: 8,
    marginHorizontal: -8,
    marginVertical: -8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  stretch: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
});
