import React from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Language from "../components/Language";
import Link from "@mui/material/Link";

const SignInOrRegister = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t("freshtrack")}</Text>
      <Text style={styles.subheading}>{t("joinMission")}</Text>
      <Text style={styles.subheading}>{t("sign_register")}</Text>
      <Link href="/home" style={styles.link}>
        {t("sign_readmore")}
      </Link>

      <Image
        style={styles.image}
        source={require("../assets/freshtrack.png")}
      />
      <View style={styles.buttonView}>
        <Button
          label="Sign In"
          value="/login"
          component={Link}
          href="/login"
          style={buttonStyles.sbutton}
        >
          {t("signInButton")}
        </Button>
        <Button
          label="Register"
          value="/register"
          component={Link}
          href="/register"
          style={buttonStyles.rbutton}
        >
          {t("registerButton")}
        </Button>
      </View>
      <Language isProfilePage={false} />
    </View>
  );
};
let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "var(--basic-w)",
    alignItems: "center",
    justifyContent: "space-around",
    height: ScreenHeight,
    margin: "auto",
    padding: 30,
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "var(--basic)",
    marginBottom: 40,
    marginTop: 40,
    textAlign: "center",
  },
  subheading: {
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    color: "var(--accent-1)",
	marginBottom: 20,
  },
  image: {
    width: "30vh",
    height: "30vh",
    marginBottom: 5,
    marginTop: 5,
  },
  buttonView: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: "20vh",
  },
});

const buttonStyles = StyleSheet.create({
  rbutton: {
    backgroundColor: "var(--basic)",
    borderRadius: 100,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 34,
    paddingRight: 34,
    marginTop: 20,
    color: "var(--basic-w)",
  },

  sbutton: {
    backgroundColor: "var(--basic-w)",
    borderRadius: 100,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 34,
    paddingRight: 34,
    marginTop: 20,
    border: "1px solid var(--basic)",
    color: "var(--basic)",
  },
});
export default SignInOrRegister;
