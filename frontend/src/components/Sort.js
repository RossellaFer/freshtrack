import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CheckIcon from '@mui/icons-material/Check';
import KitchenIcon from '@mui/icons-material/Kitchen';
import BentoIcon from '@mui/icons-material/Bento';

const Transition = React.forwardRef(function Transition(props, ref) {
	return (
		<Slide
			direction='up'
			ref={ref}
			{...props}
		/>
	);
});
const Sort = (props) => {
	return (
		<View style={styles.container}>
			<Dialog
				fullScreen
				open={props.open}
				onClose={() => props.handleSortClose()}
				TransitionComponent={Transition}>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						onClick={() => props.handleSortClose()}
						aria-label='close'>
						<CloseIcon />
					</IconButton>
					<Typography
						sx={{ ml: 2, flex: 1 }}
						variant='h6'
						component='div'>
						Sort by
					</Typography>
					<IconButton
						autoFocus
						color='inherit'
						onClick={() => props.handleSortClose()}>
						<CheckIcon />
					</IconButton>
				</Toolbar>
				<View style={styles.content}>
					<Button
						style={styles.button}
						onClick={() => props.handleSortClose()}
						variant='outlined'>
						Category
					</Button>
					<Button
						style={styles.button}
						onClick={() => props.handleSortClose()}
						variant='outlined'>
						Exp. date
					</Button>
					<Button
						style={styles.button}
						onClick={() => props.handleSortClose()}
						variant='outlined'>
						Name
					</Button>
				</View>
				<Divider />
				<View style={styles.content}>
					<Typography
						sx={{ ml: 2, flex: 1 }}
						variant='h6'
						component='div'>
						Filter
					</Typography>
					<Typography
						sx={{ ml: 2, flex: 1, color: 'gray' }}
						variant='p'
						component='div'>
						See groceries categorized as:
					</Typography>
					<View style={styles.filterView}>
						<IconButton
							style={styles.filterButton}
							onClick={() => props.handleSortClose()}
							aria-label='close'>
							<span style={styles.filterText}>None</span>
						</IconButton>
						<IconButton
							style={styles.filterButton}
							onClick={() => props.handleSortClose()}
							aria-label='close'>
							<KitchenIcon />
						</IconButton>
						<IconButton
							style={styles.filterButton}
							onClick={() => props.handleSortClose()}
							aria-label='close'>
							<BentoIcon />
						</IconButton>
					</View>
				</View>
			</Dialog>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: '1rem',
	},
	content: {
		margin: '1rem',
	},
	button: {
		width: '10em',
		borderRadius: 50,
		margin: '0.5em',
		color: 'black',
		borderColor: 'lightgray',
	},
	filterView: {
		display: 'flex',
		flexDirection: 'row',
	},
	filterButton: {
		width: '4rem',
		height: '4rem',
		margin: '0.5rem',
		border: '2px solid lightgray',
	},
	filterText: {
		fontSize: '1rem',
		fontWeight: 'bold',
		color: 'gray',
	},
});
export default Sort;
