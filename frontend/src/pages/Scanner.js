import React, { useState } from 'react';
import { View, SafeAreaView, Pressable, StyleSheet } from 'react-native';
import '../styles/scanner.css';
import Html5QrcodePlugin from '../components/scanner/Html5QrcodePlugin';
import ResultContainerPlugin from '../components/scanner/ResultContainerPlugin';
import { Html5QrcodeScanner } from 'html5-qrcode';

const Scanner = (props) => {
	const [errorTotal, setErrorTotal] = useState(0);
	const [decodedResults, setDecodedResults] = useState([]);

	//async function getFoodName(barcode) {
	const getFoodName = async (barcode, decodedResult) => {
		try {
			let foodURL =
				'https://world.openfoodfacts.org/api/v2/product/' +
				barcode.toString() +
				'.json';
			let response = await fetch(foodURL, {
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
			});
			//console.log('RESPO: ' + response.data);

			let answer = await response.json();
			//console.log('ANSWER:' + answer);
			//answer.product.product_name;
			let name = answer.product.brands + ' - ' + answer.product.product_name;

			//console.log('foodINfo:' + foodInfo);
			//console.log('App [result]', decodedResult);
			decodedResult.ScanName = name;
			setDecodedResults((prev) => [...prev, decodedResult]);
		} catch (error) {
			console.error('ERROR: ' + error);
			alert('unable to find Barcode, Please input item');
		}
	};

	const onNewScanResult = (decodedText, decodedResult) => {
		//let foodInfo =
		getFoodName(decodedText, decodedResult);
		//console.log('App [result]', decodedResult);
		/*
console.log('foodINfo:' + foodInfo);

		console.log('App [result]', decodedResult);
		setDecodedResults((prev) => [...prev, decodedResult]);
		Html5QrcodeScanner.clear();
		*/
		Html5QrcodeScanner.clear();
	};

	//qrCodeErrorCallback={onScanError}
	// const onScanError = (errorMessage) => {
	// 	if (errorTotal === 100) {
	// 		console.log('errorMessage:', errorMessage);
	// 		setErrorTotal(0);
	// 	} else {
	// 		setErrorTotal((prevTotal) => prevTotal + 1);
	// 	}
	// };

	// Square QR box with edge size = 70% of the smaller edge of the viewfinder.
	let qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
		let minEdgePercentage = 0.7; // 70%
		let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
		let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
		if (qrboxSize < 50) {
			qrboxSize = 50;
		}
		return {
			width: qrboxSize,
			height: qrboxSize,
		};
	};

	return (
		<div className='App'>
			<section className='App-section'>
				<Html5QrcodePlugin
					fps={10}
					qrbox={qrboxFunction}
					aspectRatio={1.77777778}
					disableFlip={false}
					qrCodeSuccessCallback={onNewScanResult}
				/>

				<ResultContainerPlugin results={decodedResults} />
			</section>
		</div>
	);
};

export default Scanner;
