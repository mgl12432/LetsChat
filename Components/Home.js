import React from 'react';
import { StyleSheet, View,Text, StatusBar  } from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';


export default AppConfigure = () => {
  const {width} = useWindowDimensions('window');
  return ( 
    <View style={[styles.container,{width, backgroundColor:'black'}]}>
      <View >
        <Text style={[{color:'white'}]}>Home page</Text>
      </View>
      <StatusBar backgroundColor='black' barStyle='lite-content'  />
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
    
})


