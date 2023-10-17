import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CircleIcon from '@mui/icons-material/Circle';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const FoodCard = (props) => {
	const [open, setOpen] = React.useState(false);
	const [status, setStatus] = React.useState('');

	const handleClick = () => {
		setStatus('Success');
		setOpen(true);
	};

	const handleClose = (reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	const action = (
		<React.Fragment>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={handleClose}>
				<CloseIcon fontSize='small' />
			</IconButton>
		</React.Fragment>
	);

	return (
		<Card
			style={styles.card}
			variant='outlined'>
			{/* time Icon */}
			<Box style={{ height: '100%' }}>
				<CircleIcon />
			</Box>
			{/* Name and Expires in 1 month */}
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					padding: '0.5rem',
				}}>
				<span
					style={{
						fontSize: '1rem',
						fontWeight: 'bold',
					}}>
					{props.item[2]?.Name}
				</span>
				<span>Expires in</span>
			</Box>
			{/* Image */}
			<Box
				style={{
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					paddingInline: '1rem',
				}}>
				<RestaurantIcon />
			</Box>
			<Box
				style={{
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					paddingInline: '1rem',
				}}>
				{props.type === 'searchAdd' ? (
					<Pressable onPress={handleClick}>
						<IconButton
							color='primary'
							aria-label='add item'>
							<AddCircleOutlineOutlinedIcon />
						</IconButton>
					</Pressable>
				) : (
					<div>
						<span>My Pantry</span>
					</div>
				)}
			</Box>

			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={open}
				autoHideDuration={1000}
				onClose={handleClose}
				message={status}
				action={action}
			/>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		borderRadius: 15,
		width: '70vw',
		margin: 12,
		padding: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export default FoodCard;
