import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Pressable,
	StyleSheet,
	View,
	TextInput,
	ScrollView,
} from 'react-native';

import FoodCard from '../components/FoodCard';
import Sort from '../components/Sort';
import { foodInfo } from '../data/foodsaver.js';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CreateIcon from '@mui/icons-material/Create';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';

import CreateNew from '../pages/CreateNew';
const Search = () => {
	const [timesPressed, setTimesPressed] = useState(0);

	let textLog = '';
	if (timesPressed > 1) {
		textLog = timesPressed + 'x onPress';
	} else if (timesPressed > 0) {
		textLog = 'onPress';
	}

	const [text, onChangeText] = React.useState('');

	const [foodName, setFoodName] = useState('');

	const [result, setResult] = useState([]);

	const handleSubmit = (e) => {
		setResult([]);
		e.preventDefault();
		if (foodName !== '') {
			let test = foodInfo[0].sheets[2].data.filter(
				(product) =>
					product[4].Keywords !== null &&
					product[4].Keywords.includes(foodName.trim())
			);
			//console.log(test);

			setResult(test);
		}
	};
	//Sort Dialog
	const [sortopen, setsortOpen] = React.useState(false);

	const handleSortOpen = () => {
		setsortOpen(true);
	};

	const handleSortClose = () => {
		setsortOpen(false);
	};

	//Create New Dialog
	const [cnopen, setcnOpen] = React.useState(false);
	console.log(cnopen);
	const handleCNOpen = () => {
		setcnOpen(true);
	};

	const handleCNClose = () => {
		setcnOpen(false);
	};

	return (
		<View style={styles.container}>
			<Box style={styles.searchsection}>
				<TextInput
					value={foodName}
					onChangeText={setFoodName}
					placeholder='food name'
					name='name'
					style={styles.input}
				/>
				<Pressable
					style={styles.button}
					onPress={handleSubmit}>
					<IconButton aria-label='search'>
						<SearchIcon />
					</IconButton>
				</Pressable>
			</Box>
			<View style={styles.view}>
				<ScrollView
					vertical
					scrollEnabled='true'
					nestedScrollEnabled='true'
					overScrollMode='always'
					style={styles.scrollView}
					contentContainerStyle={styles.contentContainer}>
					{result.length > 0 ? (
						result.map((item) => (
							<FoodCard
								key={item[0]?.ID}
								item={item}
								type='searchAdd'
							/>
						))
					) : (
						<View style={styles.emptycontent}>
							<span>Type to display items to add</span>
							<span>Tap the scan button to add food</span>
						</View>
					)}
				</ScrollView>
			</View>

			<ButtonGroup
				style={styles.buttonGroup}
				variant='contained'
				aria-label='outlined primary button group'>
				<Button onClick={handleCNOpen}>
					<CreateIcon />
					Write
				</Button>

				<Button
					label='Scan'
					value='/scanner'
					component={Link}
					to='/scanner'>
					<DocumentScannerOutlinedIcon sx={{ transform: 'rotate(90deg)' }} />
					Scan
				</Button>

				<Button onClick={handleSortOpen}>
					<SortOutlinedIcon />
					Sort
				</Button>
			</ButtonGroup>
			<Sort
				open={sortopen}
				handleSortClose={handleSortClose}
			/>
			<CreateNew
				open={cnopen}
				handleCNClose={handleCNClose}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},

	searchsection: {
		display: 'flex',
		flexDirection: 'row',
		paddingInline: '1em',
		justifyContent: 'center',
		width: "100%"
	},
	view: { flex: 1, height: 100 },
	scrollView: {
		margin: 20,
		alignSelf: 'center',
		paddingBottom: 100,
	},
	contentContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',

		paddingBottom: 50,
	},

	emptycontent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',

		textAlign: 'center',
	},
	input: {
		width: '60vw',
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 50,
	},
	button: {
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 12,
	},
	text: {
		fontSize: '1rem',
	},
	buttonGroup: {
		position: 'fixed',
		bottom: '15vh',
		zIndex: 1000,
	},
});

export default Search;

/* <Pressable
				onPress={() => {
					setTimesPressed((current) => current + 1);
				}}
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
					},
					styles.wrapperCustom,
				]}>
				{({ pressed }) => (
					<Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
				)}
			</Pressable>
			<View style={styles.logBox}>
				<Text testID='pressable_press_console'>{textLog}</Text>
			</View> 
			
			
			
				<h1>
								{item[0]?.ID} - {item[2]?.Name}
							</h1>
							<h2>Keywords: {item[4]?.Keywords}</h2>
							<h3>How long it will last from Date of Purchase:</h3>
							<br />
							<span>
								Pantry: {item[9]?.DOP_Pantry_Min} - {item[10]?.DOP_Pantry_Max}{' '}
								{item[11]?.DOP_Pantry_Metric}
								<br />
								{item[8]?.Pantry_tips}
							</span>
							<br />
							<span>
								Refrigerated: {item[20]?.DOP_Refrigerate_Min} -
								{item[21]?.DOP_Refrigerate_Max}{' '}
								{item[22]?.DOP_Refrigerate_Metric}
							</span>
							<br />
							<span>
								Frozen: {item[30]?.Freeze_Min} - {item[31]?.Freeze_Max}{' '}
								{item[32]?.Freeze_Metric}
								<br />
								{item[33]?.Freeze_Tips}
							</span>
							*/
