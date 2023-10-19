import React, { useState } from 'react';
import '../styles/scanner.css';
import Html5QrcodePlugin from '../components/scanner/Html5QrcodePlugin';
import ResultContainerPlugin from '../components/scanner/ResultContainerPlugin';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const Scanner = (props) => {
	const [decodedResults, setDecodedResults] = useState([]);

	const [alertOpen, setAlertOpen] = React.useState(false);
	const [alertStatus, setAlertStatus] = React.useState('');

	const handleAlertClose = (reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlertOpen(false);
	};
	const alertAction = (
		<React.Fragment>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={handleAlertClose}>
				<CloseIcon fontSize='small' />
			</IconButton>
		</React.Fragment>
	);

	//async function getFoodName(barcode) {
	const getFoodName = async (barcode, decodedResult) => {
		setAlertStatus('');
		setAlertOpen(false);

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
			let name = '';

			if (answer.product.brands === undefined) {
				name = answer.product.product_name;
			} else {
				name = answer.product.brands + ' - ' + answer.product.product_name;
			}

			//console.log('foodINfo:' + foodInfo);
			//console.log('App [result]', decodedResult);
			decodedResult.ScanName = name;
			setDecodedResults((prev) => [...prev, decodedResult]);
		} catch (error) {
			//console.error('ERROR: ' + error);
			setAlertOpen(true);
			setAlertStatus('Unable to find Barcode, Please create new item');
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
		let minEdgePercentage = 0.9; // 70%
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
		<>
			<SafeAreaView className='App'>
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={alertOpen}
					autoHideDuration={2000}
					onClose={handleAlertClose}
					message={alertStatus}
					action={alertAction}
					severity='error'></Snackbar>
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
			</SafeAreaView>
		</>
	);
};
const styles = StyleSheet.create({
	button: {
		width: '11em',
		borderRadius: 50,
		margin: '0.5rem',
		color: 'white',
		backgroundColor: 'black',
	},
});

export default Scanner;
