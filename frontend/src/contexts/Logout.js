// Logout.tsx
import React from "react";
import { useAuth } from "./useAuth";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";

function Logout() {
  // Destructing our hook to get the `logout` function
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <ListItem disablePadding onClick={logout}>
      <ListItemButton>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={`${t("menu.logout")}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default Logout;
