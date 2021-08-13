import React from 'react';
import { StyleSheet, View,Text, ActivityIndicator } from 'react-native';


export default Splash = () => {
  return ( 
    <View style={styles.container}>
      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    loading: {
      fontSize : 30,
    }
    
})


