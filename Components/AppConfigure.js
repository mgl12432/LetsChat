import React,{useState, useEffect} from 'react';
import { View,Text, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home'
import Onboardview from './Onboardview'
import Splash from './Splash'
 






export default AppConfigure = () => {
    const [splash, setSplash] = useState(true);
    const [viewedOnboarding, setViewedonboarding] = useState(false)

    const checkonboardstatus = async() => {
        try {
            const value = await AsyncStorage.getItem('onboardchecked');
            
            if(value !== null)
            {
                setViewedonboarding(true);
            }
            
    
        } catch (error) {
            console.log('Error @checkingonboard : => '+error);
        } finally {
            setSplash(false)
        }
    }
    
    useEffect(() => {
        checkonboardstatus();
    },[])
    

    return ( 
        <View style={styles.container}>
            {splash?<Splash/>:viewedOnboarding? <Home />:<Onboardview/>}
            <StatusBar style='auto' />
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