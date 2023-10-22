import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants';
import {
	StyleSheet,
	View,
	ScrollView,
	Dimensions,
	StatusBar,
	Image,
} from 'react-native';
import FoodCard from '../components/FoodCard';
import FoodCardFridge from '../components/FoodCardFridge';
import Sort from '../components/Sort';
import { freezer, fridge, pantry } from '../data/foodsavertest.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CreateIcon from '@mui/icons-material/Create';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import CreateNew from '../pages/CreateNew';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/useAuth';
import { useEffect } from 'react';
import { Picker } from 'react-native-web';

import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import KitchenIcon from '@mui/icons-material/Kitchen';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const Search = () => {
	const { t } = useTranslation();
	const [vis, setVis] = useState({
		fridge: true,
		freezer: true,
		pantry: true,
	});

	const [resultFridge, setResultFridge] = useState([]);
	const [resultPantry, setResultPantry] = useState([]);
	const [resultFreezer, setResultFreezer] = useState([]);
	const [category, setCategory] = useState('');
	const [status, setStatus] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		fetchInitialData(user).then((callComplete) => {
			if (callComplete) {
				setStatus(false);
			} else {
				setStatus(true);
			}
		});
	}, []);

	const fetchInitialData = async (userdata) => {
		//TODO to be changed with individual user list
		const results = await axios.get(API_URL).then(res => {
			//TODO change this to all results
			return res.data.slice(0, 10);
		});
		setResultFridge(results);
		setResultPantry(pantry);
		setResultFreezer(freezer);

		if (fridge.length > 0 || pantry.length > 0 || freezer.length > 0) {
			setCategory('All');
		}

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true);
			}, 300);
		});
	};

	const handleCategoryFilter = (itemValue) => {
		setCategory(itemValue);

		switch (itemValue) {
			case 'fridge':
				setVis(() => {
					return { fridge: true, freezer: false, pantry: false };
				});
				break;
			case 'freezer':
				setVis(() => {
					return { freezer: true, fridge: false, pantry: false };
				});
				break;
			case 'pantry':
				setVis(() => {
					return { pantry: true, freezer: false, fridge: false };
				});
				break;
			default:
				setVis(() => {
					return { fridge: true, freezer: true, pantry: true };
				});
				break;
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

	const handleCNOpen = () => {
		setcnOpen(true);
	};

	const handleCNClose = () => {
		setcnOpen(false);
	};

	return (
		<View style={styles.container}>
			<Box style={styles.searchsection}>
				<Picker
					selectedValue={category}
					onValueChange={handleCategoryFilter}
					style={styles.input}>
					<Picker.Item
						label="All Categories"
						value="All"
					/>
					<Picker.Item
						label="Fridge"
						value="fridge"
					/>
					<Picker.Item
						label="Freezer"
						value="freezer"
					/>
					<Picker.Item
						label="Pantry"
						value="pantry"
					/>
				</Picker>
				{/* <Pressable
					style={styles.button}
					onPress={handleSearch}>
					<IconButton aria-label="search">
						<SearchIcon />
					</IconButton>
				</Pressable> */}
			</Box>
			<span>{status ? 'Fetching Food...' : ''}</span>
			{category !== '' ? (
				<View style={styles.view}>
					<span style={styles.subheading}>{t('productInstruct')}</span>
					<ScrollView
						vertical
						scrollEnabled="true"
						nestedScrollEnabled="true"
						overScrollMode="always"
						style={styles.scrollView}
						contentContainerStyle={styles.contentContainer}>
						{resultFridge.length > 0 && vis.fridge ? (
							<>
								<span style={styles.group}>
									<KitchenIcon /> {t('productDetails.fridge')}
								</span>
								{resultFridge.map((item, i) => (
									<FoodCardFridge
										key={item.external_id}
										item={item}
										type="current"
										location="fridge"
									/>
								))}
							</>
						) : (
							<></>
						)}

						{resultPantry.length > 0 && vis.pantry ? (
							<>
								<span style={styles.group}>
									<StorefrontRoundedIcon /> {t('productDetails.pantry')}
								</span>
								{resultPantry.map((item, i) => (
									<FoodCard
										key={item.id}
										item={item}
										type="current"
										location="pantry"
									/>
								))}
							</>
						) : (
							<></>
						)}
						{resultFreezer.length && vis.freezer > 0 ? (
							<>
								<span style={styles.group}>
									<AcUnitIcon /> {t('productDetails.freezer')}
								</span>
								{resultFreezer.map((item, i) => (
									<FoodCard
										key={item.id}
										item={item}
										type="current"
										location="freezer"
									/>
								))}
							</>
						) : (
							<></>
						)}
					</ScrollView>
				</View>
			) : (
				<View style={styles.emptycontent}>
					<span>{t('search1')}</span>
					<span>{t('search2')}</span>
					<span>{t('search3')}</span>
					<Image
						style={styles.image}
						source={require('../assets/placeholder.png')}
					/>
					<span>{t('search4')}</span>
					<span>{t('search5')}</span>
				</View>
			)}
			<View style={styles.buttonContainer}>
			<ButtonGroup
				style={styles.buttonGroup}
				variant="contained"
				aria-label="outlined primary button group">
				<Button
					style={styles.bGButton}
					onClick={handleCNOpen}>
					<CreateIcon />
					Write
				</Button>

				<Button
					style={styles.bGButton}
					label="Scan"
					value="/scanner"
					component={Link}
					to="/scanner">
					<DocumentScannerOutlinedIcon sx={{ transform: 'rotate(90deg)' }} />
					Scan
				</Button>

				<Button
					style={styles.bGButton}
					onClick={handleSortOpen}>
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
		</View>
	);
};

let ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		height: ScreenHeight,
		marginBottom: StatusBar.currentHeight,
	},

	searchsection: {
		display: 'flex',
		flexDirection: 'row',
		paddingInline: '1em',
		justifyContent: 'center',
	},
	view: { flex: 1, placeItems: 'center' },
	scrollView: {
		margin: 20,
		alignSelf: 'center',
		marginBottom: 140,
	},
	contentContainer: {
		flexGrow: 1,
		alignItems: 'center',
	},

	emptycontent: {
		display: 'flex',
		flexDirection: 'column',
		height: '70%',
		width: '80%',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		fontWeight: 'bold',
		fontSize: '1rem',
		textAlign: 'center',
	},
	input: {
		margin: '1rem',
		borderWidth: 1,
		borderRadius: 50,
		padding: '1rem',
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
	buttonContainer: {
		position: 'fixed',
		bottom: '10px',
		zIndex: 1,
		padding: 20,
		backgroundColor: 'rgba(255,255,255,0.2)',
		backdropFilter: "blur(5px)"
	},
	image: {
		width: '20vh',
		height: '20vh',
	},
	bGButton: {
		cursor: 'pointer',
		backgroundColor: 'var(--basic)',
		borderColor: 'var(--basic-w)',
	},
	subheading: {
		fontWeight: 'bold',
		fontSize: '1rem',
		textAlign: 'center',
		width: '80%',
	},
	group: {
		fontWeight: 'bold',
		fontSize: '1.4rem',
		color: 'var(--accent-2)',
	},
});

export default Search;
