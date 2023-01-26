import React, { ReactElement, useCallback, useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
// import { Formik } from "formik";
// import { Text } from "@ui-kitten/components";
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import { KeyboardAvoidingView } from "./extra/3rd-party";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useLoginMutation } from "../../services/fetch.user.service";
import { userLoggedIn } from "../../redux/features/auth/userAuth";
import { margin } from "../../components/config/spacing";
import { RootState } from "../../redux/configureStore";

const height = Dimensions.get("window").height;

export default ({ navigation }): React.ReactElement => {
  const [username, setUsername] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const { token } = useSelector((state: RootState) => state.user.expo_token);
  const [done, setDone] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  // const dispatch = useDispatch();
  // const [getUserLogin] = useGetUserMutation();
  const [login, { isLoading, isError, status, error }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    // if (token) setLoading(false);
    setLoading(false);
  }, [token]);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate("SignUp");
  };

  const handleSubmit = async () => {
    setLoading(false);
    try {
      const user = await login({ username, password, token }).unwrap();
      // @ts-ignore
      if (user !== "Incorrect Data") {
        dispatch(userLoggedIn(user));
      } else {
        showMessage({
          message: "Incorrect Username or Password",
          type: "danger",
        });
        setLoading(true)
      }
    } catch (err) {
      // console.log(err);
      showMessage({
        message: "Failed to login please check your conation",
        type: "danger",
      });
      setLoading(true)
    }
  };

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate("ForgotPassword");
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props: any): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderPersonIcon = (props: any): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={"person-add-outline"} />
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          style={styles.stretch}
          source={require("./assets/WidenOut_outline.png")}
        />
      </View>

      <Layout style={styles.formContainer} level="1">
        <Input
          placeholder="Username"
          label="Username"
          accessoryRight={renderPersonIcon}
          value={username}
          onChangeText={setUsername}
        />
        <Input
          style={styles.passwordInput}
          placeholder="Password"
          label="Password"
          accessoryRight={renderPasswordIcon}
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        />
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordButton}
            appearance="ghost"
            status="basic"
            onPress={onForgotPasswordButtonPress}
          >
            Forgot your password?
          </Button>
        </View>
      </Layout>

      {loading ? (
        <Button style={styles.signInButton} disabled size="medium">
          Loading...
        </Button>
      ) : (
        <Button
          style={styles.signInButton}
          onPress={handleSubmit}
          size="medium"
        >
          SIGN IN
        </Button>
      )}
      <Button
        style={styles.signUpButton}
        appearance="ghost"
        status="basic"
        onPress={onSignUpButtonPress}
      >
        Don't have an account? Create
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  imageBox: {
    width: "100%",
    alignItems: "center",
    marginTop: height / 6.5,
    marginBottom: 30,
  },
  stretch: {
    width: 127,
    height: 144,
  },
  textForgot: {
    textAlign: "center",
  },
  footnote: {
    marginTop: -14,
  },
  viewOr: {
    flexDirection: "row",
    alignItems: "center",
  },
  divOr: {
    flex: 1,
  },
  textOr: {
    marginHorizontal: margin.base,
  },
  textAccount: {
    textAlign: "center",
    marginBottom: margin.base,
  },
  margin: {
    marginVertical: margin.big,
  },
  viewSocial: {
    marginBottom: margin.big,
  },
  container: {
    backgroundColor: "background-basic-color-1",
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
