import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	View,
	SafeAreaView,
	Pressable,
	StyleSheet,
	TextInput,
	Text,
} from 'react-native';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ClearIcon from '@mui/icons-material/Clear';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KitchenIcon from '@mui/icons-material/Kitchen';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CategoryIcon from '@mui/icons-material/Category';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import HomeIcon from '@mui/icons-material/Home';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
	return (
		<Slide
			direction='up'
			ref={ref}
			{...props}
		/>
	);
});

const CreateNew = (props) => {
	const [foodForm, setFoodForm] = useState({
		FoodName: '',
	});
	console.log(foodForm);
	function handleFoodFormChange(input) {
		let first = input.charAt(0).toUpperCase();
		let rest = input.substring(1, input.length).toLowerCase();

		setFoodForm((prevFoodData) => {
			return {
				...prevFoodData,
				FoodName: first + rest,
			};
		});
	}

	return (
		<Dialog
			fullScreen
			open={props.open}
			onClose={() => props.handleCNClose()}
			TransitionComponent={Transition}>
			<View style={styles.container}>
				<View style={styles.iconcontent}>
					<IconButton
						style={styles.iconbutton}
						aria-label='search'>
						<NotificationsIcon />
					</IconButton>
					<IconButton onClick={() => props.handleCNClose()}>
						<ClearIcon />
					</IconButton>
				</View>
				<TextInput
					value={foodForm.FoodName}
					onChangeText={handleFoodFormChange}
					placeholder='Name'
					name='FoodName'
					style={styles.input}
				/>
				<Text style={styles.heading}>Add to</Text>
				<View style={styles.content}>
					<Button
						style={styles.button}
						variant='outlined'
						aria-label='my freezer'>
						<AcUnitIcon /> <span>My Freezer</span>
					</Button>
					<Button
						style={styles.button}
						variant='outlined'
						aria-label='my fridge'>
						<KitchenIcon /> My Fridge
					</Button>
				</View>
				<Text style={styles.heading}>Select an expiration date</Text>
				<View style={styles.content}>
					<Button
						style={styles.button}
						variant='outlined'
						aria-label='plus 3 days'>
						<CalendarMonthIcon /> +3 days
					</Button>
					<Button
						style={styles.button}
						variant='outlined'
						aria-label='plus 14 days'>
						<CalendarMonthIcon /> +14 days
					</Button>
				</View>
				<View style={styles.content}>
					<Button
						style={styles.button}
						variant='outlined'
						aria-label='no date'>
						<CalendarMonthIcon /> No Date
					</Button>
					<Button
						style={styles.button}
						variant='outlined'
						aria-label='custom'>
						<CalendarMonthIcon /> Custom
					</Button>
				</View>

				<Text style={styles.heading}>Details</Text>
				<View style={styles.content}>
					<Button
						style={styles.button}
						variant='outlined'
						aria-label='category'>
						<CategoryIcon /> Category
					</Button>
					<Button
						style={styles.button}
						variant='outlined'
						aria-label='storage'>
						<HomeIcon /> Storage
					</Button>
				</View>
				<View style={styles.content}>
					<Button
						style={styles.button}
						variant='outlined'
						aria-label='favorite'>
						<FavoriteIcon /> Favorite
					</Button>
					<Button
						style={styles.button}
						variant='outlined'
						aria-label='quantity'>
						<ProductionQuantityLimitsIcon /> Quantity
					</Button>
				</View>
				<Button
					style={styles.addbutton}
					variant='contained'
					aria-label='quantity'>
					<AddIcon /> Add Item
				</Button>
			</View>
		</Dialog>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		placeItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	input: {
		fontSize: '2rem',
		margin: 12,
		padding: 10,
		borderBottomWidth: 2,
		borderBottomColor: 'black',
		textAlign: 'center',
		width: '50%',
	},
	content: {
		display: 'flex',
		flexDirection: 'row',

		justifyContent: 'center',
	},
	iconcontent: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '60%',
	},
	iconbutton: { backgroundColor: 'lightgray', color: 'black' },
	button: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: '10em',
		borderRadius: 50,
		padding: '0.5rem',
		margin: '1em',
		color: 'black',
		borderColor: 'lightgray',
	},
	heading: {
		fontWeight: 'bold',
		color: 'gray',
	},
	addbutton: {
		width: '11em',
		borderRadius: 50,
		padding: '0.8rem',
		margin: '1em',
		color: 'white',
		backgroundColor: 'black',
	},
});
export default CreateNew;
