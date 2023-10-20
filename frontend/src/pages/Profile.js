import React, { useState } from "react";
import Language from "../components/Language";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { useAuth } from "../contexts/useAuth";
import Logout from "../contexts/Logout";
import Login from "../contexts/Login";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LanguageIcon from "@mui/icons-material/Language";

const Profile = () => {
  const [open, setOpen] = useState(true);
  const { authed, loading } = useAuth();
  const { t } = useTranslation();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <View style={styles.container}>
      {authed ? (
        <>
          <h1>{t("profile")}</h1>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${t("menu.settings")}`} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <LanguageIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${t("menu.language")}`} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Language isProfilePage={true} />
                  </List>
                </Collapse>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary={`${t("menu.favourites")}`} />
                  </ListItemButton>
                </ListItem>

                <Logout />
              </List>
            </nav>
          </Box>
        </>
      ) : (
        <Login />
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
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
