import React from 'react';
import FoodCard from '../FoodCard';

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
	console.log(data);
	const results = filterResults(data);
	return results.map((item, i) => (
		<FoodCard
			key={i}
			item={item}
			type='scanAdd'
		/>
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
				<div className='Result-section'>
					<ResultContainerTable data={results} />
				</div>
			</div>
		</div>
	);
};

export default ResultContainerPlugin;
