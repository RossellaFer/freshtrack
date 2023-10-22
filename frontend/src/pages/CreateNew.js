import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { Link } from "react-router-dom";
import { View, StyleSheet, TextInput, Text } from "react-native";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ClearIcon from "@mui/icons-material/Clear";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KitchenIcon from "@mui/icons-material/Kitchen";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import HomeIcon from "@mui/icons-material/Home";
import Slide from "@mui/material/Slide";
import { Input } from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateNew = (props) => {
  const [foodForm, setFoodForm] = useState({
    name: "",
    category_name: "",
    pantry_tips: "",
    refrigerate_tips: "",
    freeze_tips: "",
    pantry_min: "",
    pantry_max: "",
    pantry_metric: "",
    refrigerate_min: "",
    refrigerate_max: "",
    refrigerate_metric: "",
    freeze_min: "",
    freeze_max: "",
    freeze_metric: "",
    expired: false,
    consumed: false,
    external_id: "",
    location: "",
    expDate: "",
    favorite: "",
    quantity: "",
  });
  const filter = createFilterOptions();
  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [databaseFood, setDatabaseFood] = useState([]);
  const loading = open && databaseFood.length === 0;
  const [showExtraFields, setShowExtraFields] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryDateFreezer, setExpiryDateFreezer] = useState("");
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const handleLocationChange = (event, newLocation) => {
    setFoodForm((prevFoodData) => {
      return {
        ...prevFoodData,
        location: newLocation,
      };
    });
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
	//compare the expiry date to the current date and return the value in days
	const date1 = new Date(event.target.value);
	const date2 = new Date();
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


    setFoodForm((prevFoodData) => {
    	return {
    		...prevFoodData,
			refrigerate_min: diffDays,
			refrigerate_max: 0,
			refrigerate_metric: 'DAYS',
			pantry_min: diffDays,
			pantry_max: 0,
			pantry_metric: 'DAYS',
    	};
    });
  };

  const handleFreezerExpiryDateChange = (event) => {
    setExpiryDateFreezer(event.target.value);
	//compare the expiry date to the current date and return the value in days
	const date1 = new Date(event.target.value);
	const date2 = new Date();
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


    setFoodForm((prevFoodData) => {
    	return {
    		...prevFoodData,
			freezer_min: diffDays,
			freezer_metric: 'DAYS',
    	};
    });
  };

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    (async () => {
      axios.get(`${API_URL}`).then((res) => {
        setDatabaseFood(res.data);
		// get the unique categories
		const categories = [...new Set(res.data.map(item => item.category_name))];
		setUniqueCategories(categories);
      });
    })();
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setDatabaseFood([]);
    }
  }, [open]);

  //when the selectedFood changes, check if the .category property exists
  //if it does, set the state of the food form to the selectedFood
  //if it doesn't, set the state of the food form to the input
  useEffect(() => {
    if (selectedFood) {
      if (selectedFood.category_name) {
        setFoodForm((prevFoodData) => {
          return {
            ...prevFoodData,
            name: selectedFood.name,
            category_name: selectedFood.category_name,
            pantry_tips: selectedFood.pantry_tips,
            refrigerate_tips: selectedFood.refrigerate_tips,
            freeze_tips: selectedFood.freeze_tips,
            pantry_min: selectedFood.pantry_min,
            pantry_max: selectedFood.pantry_max,
            pantry_metric: selectedFood.pantry_metric,
            refrigerate_min: selectedFood.refrigerate_min,
            refrigerate_max: selectedFood.refrigerate_max,
            refrigerate_metric: selectedFood.refrigerate_metric,
            freeze_min: selectedFood.freeze_min,
            freeze_max: selectedFood.freeze_max,
            freeze_metric: selectedFood.freeze_metric,
            expired: false,
            consumed: false,
            quantity: 1,
            external_id: selectedFood.external_id,
          };
        });
        setShowExtraFields(false);
      } else {
        setFoodForm((prevFoodData) => {
          setShowExtraFields(true);
          return {
            ...prevFoodData,
            name: selectedFood.name,
            created_at: new Date(),
			expired: false,
			consumed: false,
			quantity: 1,
			external_id: null,
          };
        });
      }
    }
  }, [selectedFood]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}`, foodForm)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    props.handleCNClose();
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={() => props.handleCNClose()}
      TransitionComponent={Transition}
    >
      <View style={styles.container}>
        <View style={styles.iconcontent}>
          <IconButton style={styles.iconbutton} aria-label="search">
            <NotificationsIcon />
          </IconButton>
          <IconButton onClick={() => props.handleCNClose()}>
            <ClearIcon />
          </IconButton>
        </View>
        <form style={styles.form} autoComplete="off" onSubmit={handleSubmit}>
          <Autocomplete
            disablePortal
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            freeSolo
            id="combo-box-demo"
            getOptionLabel={(option) => option.name}
            options={databaseFood}
            value={selectedFood}
            loading={loading}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setSelectedFood({
                  name: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setSelectedFood({
                  name: newValue.inputValue,
                });
              } else {
                setSelectedFood(newValue);
              }
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.name
              );
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  inputValue,
                  name: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }}
            sx={{ maxWidth: "100%", marginLeft: "auto", marginRight: "auto" }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Food items"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />

          {showExtraFields ? (
            <>
              <View style={styles.customFieldsContent}>
              <Text style={styles.heading}>Select a custom expiry</Text>
                <FormControl variant="standard">
                  <TextField
                    value={expiryDate}
					label="Expiry date"
					pattern="[0-9]{4}"
                    onChange={handleExpiryDateChange}
                    type="date"
					max={ "9999-12-31" }
                    id="expiry-date-input"
					InputProps={{
						startAdornment: (
						  <InputAdornment position="end">
							<CalendarMonthIcon edge="end"/>
						  </InputAdornment>
						),
					  }}
                  />
                </FormControl>
				<FormControl variant="standard" style={{marginTop: "1em"}}>
                  <TextField
                    value={expiryDateFreezer}
					label="Expiry date (freezer)"
                    onChange={handleFreezerExpiryDateChange}
                    type="date"
                    id="expiry-date-freezer-input"
					InputProps={{
						startAdornment: (
						  <InputAdornment position="end">
							<CalendarMonthIcon edge="end"/>
						  </InputAdornment>
						),
					  }}
                  />
                </FormControl>
              </View>
			  <View style={styles.customFieldsContent}>
              <Text style={styles.heading}>Additional details</Text>
              <Select
                id="outlined-basic"
                label="Category"
                variant="outlined"
                value={foodForm.category_name}
                onChange={(e) =>
                  setFoodForm((prevFoodData) => {
                    return {
                      ...prevFoodData,
                      category_name: e.target.value,
					  external_id: null,
                    };
                  })
				 }
				 >
				  {uniqueCategories.map((category) => (
					<MenuItem key={category} value={category}>{category}</MenuItem>
				  ))}
					
				 </Select>
			  </View>
            </>
          ) : (
            <></>
          )}

          <View style={styles.toggleButtonGroupContainer}>
            <Text style={styles.heading}>Add to</Text>
            <ToggleButtonGroup
              value={foodForm.location}
              exclusive
              onChange={handleLocationChange}
              aria-label="food item location"
            >
              <ToggleButton value="freezer" aria-label="freezer">
                <AcUnitIcon /> <span>My Freezer</span>
              </ToggleButton>
              <ToggleButton value="fridge" aria-label="fridge">
                <KitchenIcon /> <span>My Fridge</span>
              </ToggleButton>
            </ToggleButtonGroup>
          </View>

          <Button
            style={styles.addbutton}
            variant="contained"
			type="submit"
          >
            <AddIcon /> Add Item
          </Button>
        </form>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    placeItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  iconcontent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  iconbutton: { backgroundColor: "lightgray", color: "black" },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "10em",
    borderRadius: 50,
    padding: "0.5rem",
    margin: "1em",
    color: "black",
    borderColor: "lightgray",
  },
  heading: {
    fontWeight: "bold",
    color: "gray",
    marginBottom: "1rem",
    textAlign: "center",
    fontSize: 16,
  },
  addbutton: {
    width: "11em",
    borderRadius: 50,
    padding: "0.8rem",
    margin: "1em",
    color: "white",
    backgroundColor: "black",
  },
  form: {
    maxWidth: "100%",
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: "auto",
    marginRight: "auto",
	"textAlign": "center",
  },
  input: {
    fontSize: "2rem",
    margin: 12,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    maxWidth: "100%",
  },
  select: {
    maxWidth: "100%",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  toggleButtonGroupContainer: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  customFieldsContent: {
	marginTop: "1rem",
    marginBottom: "1rem",
	display: "flex",
	flexDirection: "column",
  }
});
export default CreateNew;
