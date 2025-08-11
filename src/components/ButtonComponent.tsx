import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SECONDARY_COLOR, TERTIARY_COLOR } from '../commons/constants';

interface Props {
  textButton: string;
  onPress: () => void; 
}


export const ButtonComponent = ({ textButton, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{textButton}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: TERTIARY_COLOR,
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: SECONDARY_COLOR,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});