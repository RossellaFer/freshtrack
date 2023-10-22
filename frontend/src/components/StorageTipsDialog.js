import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const StorageTipsDialog = ({ open, handleClose, item }) => {
    const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="food-storage-tips"
    >
      <DialogTitle style={styles.title} id="food-storage-tips">
        {t('productDetails.storageTips')}: {item?.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {item?.pantry_tips && (
            <>
              <h2 style={styles.subheading}>{t('productDetails.pantry')}</h2>
              <p style={styles.description}>{item?.pantry_tips}</p>
            </>
          )}
          {item?.refrigerate_tips && (
            <>
              <h2 style={styles.subheading}>{t('productDetails.fridge')}</h2>
              <p style={styles.description}>{item?.refrigerate_tips}</p>
            </>
          )}
          {item?.freezer_tips && (
            <>
              <h2 style={styles.subheading}>{t('productDetails.freezer')}</h2>
              <p style={styles.description}>{item?.freezer_tips}</p>
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StorageTipsDialog;

const styles = StyleSheet.create({
  title: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: "1.2em",
  },
  description: {
    fontSize: "1em",
  },
});
