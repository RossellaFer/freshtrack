import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const BackButton = () => {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <Box sx={{ '& > :not(style)': { m: 1 }, position: 'absolute', top: 15, left: 10 }} onClick={goBack}>
            <IconButton
				size="small"
				aria-label="close"
				color="inherit"
				>
				<ArrowBackIosIcon />
			</IconButton>
        </Box>
    );
}

export default BackButton;