import React from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";

const Login = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>
        </View>
    );
}

export default Login;

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
});