import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Home = () => {
  //const { authed, loading } = useAuth();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>About the project</Text>
      <View>
        <Card style={styles.card}>
          <HomeIcon style={{ display: "inline", fontSize: 20 }} />
          <Box style={styles.container_inner}>
            <Text style={styles.text}>{t('home.intro1')}</Text>
          </Box>
        </Card>

		<Card style={styles.card}>
          <PublicIcon style={{ display: "inline", fontSize: 20 }} />
          <Box style={styles.container_inner}>
            <Text style={styles.text}>{t('home.intro2')}</Text>
          </Box>
        </Card>

		<Card style={styles.card}>
          <AttachMoneyIcon style={{ display: "inline", fontSize: 20 }} />
          <Box style={styles.container_inner}>
            <Text style={styles.text}>{t('home.intro3')}</Text>
          </Box>
        </Card>
      </View>

      <Pressable style={buttonStyles.button}>
        <Link to="/signInOrRegister">
          <Text style={buttonStyles.text}>{t("backButton")}</Text>
        </Link>
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    height: ScreenHeight,
    margin: "auto",
	paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginTop: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  subheading: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 20,
    textAlign: "center",
  },
  container_inner: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginLeft: "1rem",
    paddingRight: "0.5rem",
    textAlign: "left",
  },
  heading: {
    fontSize: "16px",
  },
  text: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#000",
  },
  card: {
    borderRadius: 15,
    margin: 12,
    padding: 10,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    border: "1px solid #B6B6B6",
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "var(--basic-w)",
    borderRadius: 100,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 34,
    paddingRight: 34,
    marginTop: 20,
    border: "1px solid var(--basic)",
  },
  text: {
    color: "var(--basic)",
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: 0.25,
    textAlign: "center",
  },
});
