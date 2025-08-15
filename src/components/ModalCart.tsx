import React from "react";
import { StyleSheet, Text, Touchable, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Modal } from "react-native";
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FlatList } from "react-native-gesture-handler";
import { Cart } from "../screens/HomeScreen/HomeScreen";

interface Props {
    visible: boolean;
    setShowModal: () => void;
    cart: Cart[];
}

export const ModalCart = ({ visible, setShowModal, cart }: Props) => {
    const { width } = useWindowDimensions();

    const totalPay = (): number => {
        let total = 0;
        cart.forEach(product => {
            total += product.total
            });
        return total;
    }
    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View style={styles.containerModal}>
                <View
                    style={{
                        ...styles.modal,
                        width: width * 0.8,
                    }}
                >
                    <View style={styles.headerModal}>
                        <Text style={styles.title}>Mis Productos</Text>
                        <View style={styles.containerIcon}>
                            <Icon
                                name="cancel"
                                size={20}
                                color="#3A6373"
                                onPress={setShowModal}
                            />
                        </View>
                    </View>
                    <View style={localStyles.headerTable}>
                        <Text style={localStyles.textHeaderTable}>Producto </Text>

                        <View style={localStyles.headerTableInfo}>
                            <Text style={localStyles.textHeaderTable}>Prec. | </Text>
                            <Text
                                style={{ ...localStyles.textHeaderTable, marginHorizontal: 5 }}
                            >
                                Cant. |
                            </Text>
                            <Text
                                style={{ ...localStyles.textHeaderTable, marginHorizontal: 5 }}
                            >
                                Total
                            </Text>
                        </View>
                    </View>
                    <View>
                        <FlatList
                            data={cart}
                            renderItem={({ item }) => (
                                <View style={localStyles.headerTable}>
                                    <Text style={{ color : 'white'}}>{item.name}   </Text>
                                    <Text style={{ color : 'white'}}>{item.price}    |</Text>
                                    <Text style={{ color : 'white'}}>{item.quantity}      |</Text>
                                    <Text style={{ color : 'white'}}>{item.total.toFixed(2)}</Text>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()} />
                    </View>
                <View style={localStyles.containerTotalPay}>
                        <Text style={{ color : 'white', fontWeight: 'bold', textAlign:'center'}}> 
                            Total pagar: ${totalPay().toFixed(2)}
                            </Text>
                </View>
                <TouchableOpacity style={styles.buttonAddCart}>
                    <Text style={styles.buttonAddCartText}> Comprar </Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const localStyles = StyleSheet.create({
    headerTable: {
        top : 5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: "#57A541",
        marginVertical: 5,
        margin : 5,
    },
    headerTableInfo: {
        backgroundColor: "#57A541",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        margin : 5,
    },
    textHeaderTable: {
        fontSize: 15,
        fontWeight: "bold",
        color : "white",
        
    },
    containerTotalPay: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin : 5,
        backgroundColor: "#57A541",
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontWeight: "bold",
        borderRadius: 10,

    },
});
