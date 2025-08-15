import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Product } from '../HomeScreen';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ModalProduct } from './ModalProduct';

interface Props {
    item: Product;
    updateStock: (id: number, quantity: number) => void;
}

export const CardProduct = ({item, updateStock}: Props) => { 

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
    <View>  
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: item.pathImage}} />
        <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text>Precio: ${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.containerIcon}>
            <Icon name="add-shopping-cart" size={25} color="#57A541" onPress={() => setShowModal(!showModal)} />
        </View> 
        </View>
        <ModalProduct visible={showModal} item={item} setShowModal={() => setShowModal(!showModal)} updateStock={updateStock} />
    </View>            
    )
}


const styles = StyleSheet.create({

    container: {

        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin : 5,
        borderColor: '#3A6373',
        borderStyle: 'solid',
        borderWidth: 2,

        borderRadius: 10,
    },
    title : {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#57A541',
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    
    containerIcon: {
        flex: 1,
        alignItems: 'flex-end',
        marginBottom: 10,
        marginTop: 10,
        

    },

})