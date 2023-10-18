import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import {
  FaEarthAsia,
  FaHandHoldingHeart,
  FaLeaf,
  FaPeopleGroup,
} from "react-icons/fa6";
import { useTranslation } from "react-i18next";

import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";

const impactInfo = [
  {
    id: 1,
    icon: "FaEarthAsia",
    heading: "impact",
    text: "impact_info",
  },
  {
    id: 2,
    icon: "FaHandHoldingHeart",
    heading: "food",
    text: "food_info",
  },
  {
    id: 3,
    icon: "FaLeaf",
    heading: "sustainability",
    text: "sustainability_info",
  },
  {
    id: 4,
    icon: "FaPeopleGroup",
    heading: "community",
    text: "community_info",
  }
];

const Impact = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Impact</Text>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={true}
        data={impactInfo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
            marginBottom: 60
          }}
        renderItem={({ item }) => (
          <Card style={styles.card} variant="outlined" key={item.id}>
            {item.icon === "FaEarthAsia" && (
              <FaEarthAsia style={{ display: "inline", fontSize: 20 }} />
            )}
            {item.icon === "FaHandHoldingHeart" && (
              <FaHandHoldingHeart style={{ display: "inline", fontSize: 20 }} />
            )}
            {item.icon === "FaLeaf" && (
              <FaLeaf style={{ display: "inline", fontSize: 20 }} />
            )}
            {item.icon === "FaPeopleGroup" && (
              <FaPeopleGroup style={{ display: "inline", fontSize: 20 }} />
            )}
            <Box style={styles.container_inner}>
              <Text style={styles.heading}>{t(item.heading)}</Text>
              <Text style={styles.text}>{t(item.text)}</Text>
            </Box>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

export default Impact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: StatusBar.currentHeight,
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 30,
    marginBottom: 20,
    paddingLeft: "1rem",
    textAlign: "left",
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
    marginTop: 15,
  },
  card: {
    borderRadius: 15,
    margin: 12,
    padding: 10,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    border: "1px solid #B6B6B6"
  },
});
