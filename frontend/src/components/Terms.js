import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

export default function ResponsiveDialog(props) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	const { t } = useTranslation();

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
							{t('terms.term1')}
						</DialogContentText>
						<br />
						<DialogContentText>
							{t('terms.term2')}
						</DialogContentText>
						<br />
						<DialogContentText>
						  {t('terms.term3')}
						</DialogContentText>

						<br />
						<DialogContentText>
						  {t('terms.term4')}
						</DialogContentText>
						<br />
						<DialogContentText>
						  {t('terms.term5')}
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
