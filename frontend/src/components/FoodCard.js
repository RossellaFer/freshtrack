import React from "react";
import { StyleSheet } from "react-native";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CircleIcon from "@mui/icons-material/Circle";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import KitchenIcon from "@mui/icons-material/Kitchen";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import {
  BiPieChart,
  BiAdjust,
  BiSolidPieChart,
  BiAlarmExclamation,
} from "react-icons/bi";

const FoodCard = (props) => {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");

  //
  const handleClick = () => {
    setStatus("Success");
    setOpen(true);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function getFoodRange(l, fd) {
    let min = 0;
    let max = 0;
    let metric = "";
    if (l === "fridge") {
      min = fd.refrigerate_min;
      max = fd.refrigerate_max;
      metric = fd.refrigerate_metric;
    } else if (l === "freezer") {
      min = fd.freeze_min;
      max = fd.freeze_max;
      metric = fd.freeze_metric;
    } else {
      //pantry
      //don't have dates? maybe leave for 4 - 5 months?
      min = 120;
      max = 160;
      metric = "days";
    }

    switch (metric) {
      case "year":
        min *= 365;
        max *= 365;
        break;
      case "months":
        min *= 30;
        max *= 30;
        break;
      case "weeks":
        min *= 7;
        max *= 7;
        break;
      default:
        break;
    }

    return { min, max };
  }

  const calculateTime = (loc, itemData) => {
    const currentDate = new Date();
    //TODO get created at date
    const created_at_Date = new Date("10/15/2023");
    //get how long it has been
    let daysSinceCreation = Math.floor(
      (currentDate - created_at_Date) / (1000 * 3600 * 24)
    );

    //get the range before expiration based on where it is stored
    let foodRange = getFoodRange(loc, itemData);

    let intervals = Math.abs(foodRange.min - foodRange.max) / 4;

    let x = daysSinceCreation;

    let timeIcon = "";

    if (x <= foodRange.min) {
      timeIcon = (
        <CircleIcon
          style={{ display: "inline", fontSize: 20, color: "var(--100left)" }}
        />
      );
    } else if (
      x >= foodRange.min + intervals &&
      x <= foodRange.min + intervals * 2
    ) {
      timeIcon = (
        <BiSolidPieChart
          style={{ display: "inline", fontSize: 20, color: "var(--75left)" }}
        />
      );
    } else if (
      x >= foodRange.min + intervals * 2 &&
      x <= foodRange.min + intervals * 3
    ) {
      timeIcon = (
        <BiAdjust
          style={{ display: "inline", fontSize: 20, color: "var(--50left)" }}
        />
      );
    } else if (
      x >= foodRange.min + intervals * 3 &&
      x <= foodRange.min + intervals * 4
    ) {
      timeIcon = (
        <BiPieChart
          style={{ display: "inline", fontSize: 20, color: "var(--25left)" }}
        />
      );
    } else if (x >= foodRange.min + intervals * 4) {
      timeIcon = (
        <BiAlarmExclamation
          style={{ display: "inline", fontSize: 20, color: "var(--expired)" }}
        />
      );
    }

    return timeIcon;
  };

  const getCorrectExpiration = (loc, fd) => {
    let output = "";

    if (loc === "fridge") {
      output = (
        <span>
          Expires in {fd.refrigerate_min} - {fd.refrigerate_max}{" "}
          {fd.refrigerate_metric}
        </span>
      );
    } else if (loc === "freezer") {
      output = (
        <span>
          Expires in {fd.freeze_min} - {fd.freeze_max} {fd.freeze_metric}
        </span>
      );
    } else {
      output = <></>;
    }

    return output;
  };

  return (
    <>
      <Card style={styles.card} variant="outlined">
        {/* time Icon */}
        <Box style={{ height: "100%" }}>
          {calculateTime(props.location, props.item)}
        </Box>
        {/* Name and Expires in 1 month */}
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "0.5rem",
            textAlign: "left",
          }}
        >
          <span
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {props.type === "current" ? props.item?.name : props.item.ScanName}
          </span>
          {props.type === "current" ? (
            getCorrectExpiration(props.location, props.item)
          ) : (
            <></>
          )}
        </Box>
        {/* Image */}
        <Box
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            paddingInline: "1rem",
          }}
        >
          <RestaurantIcon />
        </Box>
        <Box
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingInline: "1rem",
          }}
        >
          {props.type === "current" ? (
            <div style={styles.location}>
              {props.location === "pantry" ? (
                <>
                  <span>Pantry</span>
                  <StorefrontRoundedIcon />
                </>
              ) : props.location === "freezer" ? (
                <>
                  <span>Freezer</span>
                  <AcUnitIcon />
                </>
              ) : props.location === "fridge" ? (
                <>
                  <span>Fridge</span>
                  <KitchenIcon />
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </Box>
        {/* // import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
		// import KitchenIcon from '@mui/icons-material/Kitchen';
		// import AcUnitIcon from '@mui/icons-material/AcUnit'; */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          message={status}
          action={action}
        />
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    width: "70vw",
    margin: 12,
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  location: {
    display: "flex",
    flexDirection: "column",
    wrap: "nowrap",
    alignItems: "center",
  },
});

export default FoodCard;
