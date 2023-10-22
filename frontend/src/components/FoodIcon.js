//switch statement to use different images

import React from 'react';
import { StyleSheet, Image } from 'react-native';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const FoodIcon = ({ foodName }) => {
    if(foodName.indexOf('butter') > -1) {
        return (
            <Image style={styles.image} source={require('../assets/foodIcons/icons8-butter-66.png')} />
        )
    }
    else if(foodName.indexOf('almond') > -1) {
        return (
            <Image style={styles.image} source={require('../assets/foodIcons/icons8-almonds-64.png')} />
        )
    }
    else {
        return (
            <RestaurantIcon style={styles.image} />
        )
    }

}

const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25,
        margin: 2,
    },
});

export default FoodIcon;