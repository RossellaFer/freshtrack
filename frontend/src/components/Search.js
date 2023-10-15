import React, { useState } from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	TextInput,
	ScrollView,
} from 'react-native';

import { foodInfo } from '../data/foodsaver.js';

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

	// function handleFoodFormChange(event) {
	// 	let first = event.target.value.charAt(0).toUpperCase();
	// 	let rest = event.target.value
	// 		.substring(1, event.target.value.length)
	// 		.toLowerCase();

	// 	setFoodForm((prevFoodData) => {
	// 		return {
	// 			...prevFoodData,
	// 			[event.target.name]: first + rest,
	// 		};
	// 	});

	// 	if (result.length > 0) {
	// 		setResult([]);
	// 	}
	// }

	const handleSubmit = (e) => {
		setResult([]);
		e.preventDefault();
		if (foodName !== '') {
			let test = foodInfo[0].sheets[2].data.filter(
				(product) =>
					product[4].Keywords !== null && product[4].Keywords.includes(foodName)
			);
			//console.log(test);

			setResult(test);
		}
	};

	return (
		<View style={styles.container}>
			<div style={styles.searchsection}>
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
					<Text>Search</Text>
				</Pressable>
			</div>
			<ScrollView style={styles.content}>
				{result.map((item) => (
					<div
						style={styles.card}
						key={item[0]?.ID}>
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
							{item[21]?.DOP_Refrigerate_Max} {item[22]?.DOP_Refrigerate_Metric}
						</span>
						<br />
						<span>
							Frozen: {item[30]?.Freeze_Min} - {item[31]?.Freeze_Max}{' '}
							{item[32]?.Freeze_Metric}
							<br />
							{item[33]?.Freeze_Tips}
						</span>
					</div>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	searchsection: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		width: '90rem',
	},
	content: {
		height: '80vh',
		width: '100%',
		wordWrap: 'wrap',

		padding: '1em',
	},
	input: {
		height: 40,
		width: '30rem',
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 20,
	},
	button: {
		height: 40,
		width: '5rem',
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 20,
	},
	card: {
		margin: 12,
		borderWidth: 3,
		padding: 10,
		borderRadius: 20,
	},
	text: {
		fontSize: '1rem',
	},
	wrapperCustom: {
		borderRadius: 8,
		padding: 6,
	},
	logBox: {
		padding: 20,
		margin: 10,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#f0f0f0',
		backgroundColor: '#f9f9f9',
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
			</View> */
