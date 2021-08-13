import React, { useState } from 'react';
import {Image, StyleSheet, useWindowDimensions, View, Text, Dimensions, Button, TouchableOpacity, TouchableHighlight, Animated, StatusBar } from 'react-native';


export default Onboardingtemplate = ({item, scrollTo, index}) => 
{
    const {width} = useWindowDimensions('window');
    const height = Dimensions.get('window').height;

    function nextscreen(){
        if (item.start) {
            scrollTo('start');
        } else {
            scrollTo('next');
        }
    }

    return (
        <View style={[ styles.container, {width,height:height, backgroundColor:item.backgroundcolor}]}>
            <View style={[{flex:1}]}>
                <Text style={[styles.title, {color:item.foregroundcolor}]}>{item.title}</Text>
            </View>
            <Image source={item.pic} style={[styles.image, {width, resizeMode:'contain'}]}/>
            <View style={[{flex:1}]}>
                <Text style={[styles.description, {color:item.foregroundcolor}]}>{item.description}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                {onboardslidedata.map(( _ , i ) => {
                    const inputrange = [(i-1)*width, i*width, (i+1)*width];
                    // const dotwidth = scrollx.interpolate({
                    //     inputrange,
                    //     outputRange:[10,20,10],
                    //     extrapolate:'clamp',
                    // });
                    return <View style={index==i?[styles.dot,{backgroundColor:item.foregroundcolor}]:[styles.dot,{backgroundColor:'gray'}]} key={i.toString()} />
                })}
            </View>
            <View  style={[styles.btn, { backgroundColor:item.foregroundcolor}]}>
                <TouchableHighlight onPress={ ()=>{nextscreen()}} >
                    {item.start?
                    <Text style={[{color:item.backgroundcolor, fontWeight:'bold',fontSize:25,alignSelf:'center', padding:15,}]}>--></Text>
                    :<Text style={[{color:item.backgroundcolor, fontWeight:'bold',fontSize:25,alignSelf:'center', padding:15,}]}>--></Text>}
                </TouchableHighlight>
            </View>
             <StatusBar backgroundColor={item.backgroundcolor} barStyle='light-content' />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        height:'100%',
    },
    image : {
        flex:2,
        justifyContent : 'center'
    },
    title:
    {
        fontSize:30,
        marginLeft:'auto',
        marginTop:30,
        marginRight:'auto',
    },
    description:
    {
        fontSize:25,
        textAlign: 'center',
        padding:40
    },
    btn:
    {
        height:60,
        textAlign:'center',
        borderRadius:30,
        width:60,
        marginBottom:20,
        marginLeft:'auto',
        marginRight:30,
        bottom:'0%'
    },
    dot:{
        height:10,
        width:10,
        borderRadius:5,
        backgroundColor:'gray',
        marginHorizontal:8,
        position:'relative',
        marginBottom:30
    }
})