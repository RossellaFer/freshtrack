import React from 'react';
import FoodCard from '../FoodCard';
import { ScrollView, StyleSheet } from 'react-native';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

function filterResults(results) {
	let filteredResults = [];
	for (var i = 0; i < results.length; ++i) {
		if (i === 0) {
			filteredResults.push(results[i]);
			continue;
		}

		if (results[i].decodedText !== results[i - 1].decodedText) {
			filteredResults.push(results[i]);
		}
	}

	return filteredResults;
}

const ResultContainerTable = ({ data }) => {
	const results = filterResults(data);
	return results.map((item, i) => (
		<div
			style={styles.card}
			key={i}>
			<FoodCard
				key={i}
				item={item}
				type='scanAdd'
			/>
			<div style={styles.cardview}>
				<div>
					<IconButton size='small'>
						<CreateIcon />
					</IconButton>
					<IconButton size='small'>
						<DeleteIcon />
					</IconButton>
				</div>
				<Button style={styles.cardbutton}>My Pantry</Button>
			</div>
		</div>
	));
	// <table className={'Qrcode-result-table'}>
	// 	<thead>
	// 		<tr>
	// 			<td>#</td>
	// 			<td>Decoded Text</td>
	// 			<td>Format</td>
	// 			<td>Name</td>
	// 		</tr>
	// 	</thead>
	// 	<tbody>
	// 		{results.map((result, i) => {
	// 			return (
	// 				<tr key={i}>
	// 					<td>{i}</td>
	// 					<td>{result.decodedText}</td>
	// 					<td>{result.result.format.formatName}</td>
	// 					<td>{result.name}</td>
	// 				</tr>
	// 			);
	// 		})}
	// 	</tbody>
	// </table>
};

const ResultContainerPlugin = (props) => {
	const results = filterResults(props.results);
	return (
		<div className='Result-main'>
			{results.length > 0 ? (
				<div className='Result-header'>
					You have ({results.length}) item(s) ready to add
				</div>
			) : (
				<div className='Result-header'>Start Scanning Barcodes</div>
			)}
			<div className='Result-container'>
				<ScrollView style={styles.scroll}>
					<div className='Result-section'>
						<ResultContainerTable data={results} />
					</div>
				</ScrollView>
				{results.length > 1 ? (
					<Button style={styles.button}>Save All Items</Button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

const styles = StyleSheet.create({
	scroll: {
		height: '40vh',
		paddingBottom: '30vh',
	},
	button: {
		zIndex: 100,
		position: 'fixed',
		bottom: '8vh',
		padding: '1rem',
		borderRadius: 50,
		margin: '0.5rem',
		color: 'white',
		backgroundColor: 'black',
	},
	cardview: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	cardbutton: {
		borderRadius: 50,
		margin: '0.5rem',
		color: 'white',
		backgroundColor: 'gray',
	},
});
export default ResultContainerPlugin;
