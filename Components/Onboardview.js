import React, {useState, useRef} from 'react';
import { FlatList, View, StyleSheet,Animated } from 'react-native';
import Onboardingtemplate from './Onboardingtemplate';
import onboardslidedata from '../JSON/onboardslidedata';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Onboardview = () => 
{
    const scrollx = useRef(new Animated.Value(0)).current;
    var [curIndex, setCurIndex] = useState(0);

    const viewableItemChanged = useRef(({viewableItems})=>{
        setCurIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold:50 }).current;
    const slideRef = useRef(null);

    const scrollTo = async(page) => {
        if(page == 'next')
            slideRef.current.scrollToIndex({index:curIndex+1});
        else
            try {
                await AsyncStorage.setItem('onboardchecked',"true")
            } catch (error) {
                console.log('Error @setonboard => '+error);
            }
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={onboardslidedata} 
                renderItem={({item}) => <Onboardingtemplate index={curIndex} scrollTo={scrollTo} item={item} />}
                horizontal
                showsHorizontalScrollIndicator = {false}
                pagingEnabled
                keyExtractor={(item) => item.id}
                onScroll = {Animated.event([{nativeEvent: { contentOffset: { x: scrollx}}}],
                {useNativeDriver : false})}
                onViewableItemsChanged = {viewableItemChanged}
                viewabilityConfig = {viewConfig}
                ref = {slideRef}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        justifyContent : 'center',
        flex : 0,
        alignItems : 'center'
    }

})