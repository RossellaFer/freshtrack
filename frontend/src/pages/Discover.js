import React from "react";

import { StyleSheet, View, Text } from "react-native";

const Discover = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.heading}>Discover</Text>
        <Text style={styles.text}>
            This is the Discover page. This page is only accessible to authenticated
            users.
        </Text>
        </View>
    );
}

export default Discover;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'flex-start',
        padding: 30
    },
    heading: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 60,
        textAlign: 'center'
      },
      text: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center'
      },
});
