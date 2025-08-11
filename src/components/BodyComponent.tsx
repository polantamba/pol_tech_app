import React, { ReactNode } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SECONDARY_COLOR, TERTIARY_COLOR } from '../commons/constants';


interface Props{
    children: ReactNode; 
}

export const BodyComponent = ({children}:Props) => {
    
   
    const { height } = useWindowDimensions();
    return (
        <View style={{
            ...styles.container,
            height: height * 0.88
        }}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: TERTIARY_COLOR,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal: 40,
        paddingTop:30
    }
});