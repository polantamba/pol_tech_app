
import React, { useState } from 'react'
import { Image, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { Modal } from 'react-native'
import { styles } from '../../../theme/appTheme'
import { Product } from '../HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useWindowDimensions } from 'react-native';
import { Alert } from 'react-native';
interface Props {
    visible: boolean;
    item: Product;
    setShowModal: () => void;
    updateStock: (id: number, quantity: number) => void;
}

export const ModalProduct = ({ visible, item, setShowModal, updateStock }: Props) => {
    //hook windows dimensions 
    const { width } = useWindowDimensions();
    //hoook use state
    const [quantity, setQuantity] = useState<number>(1);

    //funcion agregar al carrito
    const handleAddCart = () => {
        //llamar funcion para actualizar el stock
        updateStock(item.id, quantity);
        setShowModal();
        setQuantity(1);
    }
    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View style={styles.containerModal}>
                <View style={{
                    ...styles.modal,
                    width: width * 0.80,
                }}>
                    <View style={styles.headerModal}>
                        <Text style={styles.title}>{item.name} | $ {item.price} </Text>

                        <View>
                            <Icon name='cancel'
                                size={20}
                                color='#3A6373'
                                onPress={setShowModal} />
                        </View>
                    </View>
                    <View>
                        <Image source={{ uri: item.pathImage }}
                            style={styles.imageModal} />
                    </View>
                    {
                        (item.stock == 0)
                            ? <Text style={styles.textStock}>Producto Agotado</Text>
                            :

                            <View>

                                <View style={styles.containerQuiantity}>
                                    <TouchableOpacity style={styles.buttonQuantity}
                                        onPress={() => setQuantity(quantity - 1)}
                                        disabled={quantity <= 1}
                                        >
                                        <Text style={styles.buttonQuantityText}> - </Text>
                                    </TouchableOpacity>

                                    <Text style={styles.buttonQuantityText}> {quantity} </Text>

                                    <TouchableOpacity style={styles.buttonQuantity}
                                        onPress={() => setQuantity(quantity + 1)}
                                        disabled={quantity == item.stock}>
                                        <Text style={styles.buttonQuantityText}> + </Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.textTotal}>Total: $ {(item.price * quantity).toFixed(2)}</Text>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.buttonAddCart}
                                    onPress={handleAddCart}>
                                        <Text style={styles.buttonAddCartText}>Agregar al carrito</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    }
                </View>
            </View>
        </Modal>
    )
}
