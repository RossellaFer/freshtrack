import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = 'html5qr-code-full-region';

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
	let config = {};
	if (props.fps) {
		config.fps = props.fps;
	}
	if (props.qrbox) {
		config.qrbox = props.qrbox;
	}
	if (props.aspectRatio) {
		config.aspectRatio = props.aspectRatio;
	}
	if (props.disableFlip !== undefined) {
		config.disableFlip = props.disableFlip;
	}

	config.supportedScanTypes = [Html5QrcodeScanType.SCAN_TYPE_CAMERA];
	return config;
};

const Html5QrcodePlugin = (props) => {
	useEffect(() => {
		// when component mounts
		const config = createConfig(props);
		const verbose = props.verbose === true;
		// Suceess callback is required.
		const errorMessage = 'qrCodeSuccessCallback is required callback.';
		if (!props.qrCodeSuccessCallback) {
			throw errorMessage;
		}
		const html5QrcodeScanner = new Html5QrcodeScanner(
			qrcodeRegionId,
			config,
			verbose
		);
		html5QrcodeScanner.render(
			props.qrCodeSuccessCallback,
			props.qrCodeErrorCallback
		);

		// cleanup function when component will unmount
		return () => {
			html5QrcodeScanner.clear().catch((error) => {
				console.error('Failed to clear html5QrcodeScanner. ', error);
			});
		};
	}, []);

	return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
