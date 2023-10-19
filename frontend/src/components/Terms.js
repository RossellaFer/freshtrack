import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog(props) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<div>
			<Dialog
				fullScreen={fullScreen}
				open={props.open}
				onClose={() => props.handleCloseTerms()}
				aria-labelledby='responsive-dialog-title'>
				<DialogTitle id='responsive-dialog-title'>{'👋Hello!'}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<DialogContentText>
							As we embark on our mission to combat food waste and save the
							world, here are some terms and conditions:
						</DialogContentText>
						<br />
						<DialogContentText>
							By using this app, you agree to spread the love for coding and
							indulge in deliciously sustainable adventures.
						</DialogContentText>
						<br />
						<DialogContentText>
							In the event of a coding emergency, don't panic. Take a deep
							breath and have a bite of your favorite snack. It might not solve
							the bug, but it will definitely make you feel better - we promise.
						</DialogContentText>

						<br />
						<DialogContentText>
							This was created for Women Who Code Hackathon by a team of five
							talented ladies, scattered across the globe.
						</DialogContentText>
						<br />
						<DialogContentText>
							Happy coding and munching! 🍕👩‍💻
						</DialogContentText>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						onClick={() => props.handleCloseTerms()}>
						Thanks!
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
