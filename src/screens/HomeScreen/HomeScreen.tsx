import React, { useState } from 'react';
import { StatusBar, Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../commons/constants';
import { BodyComponent } from '../../components/BodyComponent';
import { CardProduct } from './components/CardProduct';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ModalCart } from '../../components/ModalCart';
import { styles as appStyles } from '../../theme/appTheme';

export interface Product{
    id: number;
    name: string;
    price: number;
    stock: number;
    pathImage: string;
}

export interface Cart {
    id: number;
    name: string;
    price: number;
    quantity: number;
    total: number;
}



export const HomeScreen = () => {
    const products: Product[] = [
        {id: 1, name:'iPhone 15', price: 999.99, stock: 15, pathImage: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-2.jpg'},
        {id: 2, name:'Samsung S24', price: 899.00, stock: 8, pathImage: 'https://http2.mlstatic.com/D_NQ_NP_943032-MLA74322939878_022024-O.webp'},
        {id: 3, name:'Pixel 8 Pro', price: 999.00, stock: 20, pathImage: 'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-2.jpg'},
        {id: 4, name:'MacBook M3', price: 999.00, stock: 12, pathImage: 'https://www.smartbuyecuador.com/cdn/shop/files/MacBookAirM315Mignight.png?v=1712068974'},
        {id: 5, name:'Dell XPS 15', price: 699.50, stock: 5, pathImage: 'https://m.media-amazon.com/images/I/811DyJu0SgL._AC_SL1500_.jpg'},
        {id: 6, name:'iPad Pro M4', price: 999.00, stock: 10, pathImage: 'https://mobilestore.ec/wp-content/uploads/2024/05/iPad-Pro-M4-Space-Black-Mobile-Store-Ecuador.jpg'},
        {id: 7, name:'Apple Watch 2', price: 799.00, stock: 25, pathImage: 'https://mobilestore.ec/wp-content/uploads/2023/09/Apple-Watch-Ultra-2-Blue-Ocean-Band-Mobile-Store-Ecuador.jpg'},
        {id: 8, name:'Sony WH-1000', price: 349.99, stock: 30, pathImage: 'https://www.sony.com.ec/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF'},
        {id: 9, name:'AirPods Pro 2', price: 249.00, stock: 50, pathImage: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803734968'},
        {id: 10, name:'Nintendo Switch', price: 349.99, stock: 7, pathImage: 'https://mobilestore.ec/wp-content/uploads/2023/12/Nintendo-Switch-Modelo-OLED-Edicion-Especial-The-Legend-of-Zelda-Mobile-Store-Ecuador.jpg'},
    ];

    const [listProducts, setlistProducts] = useState<Product[]>(products);
    const [cart, setCart] = useState<Cart[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    const updateStock = (id: number, quantity: number) => {
        const updatedProducts = listProducts.map(product =>
            product.id === id
                ? { ...product, stock: product.stock - quantity }
                : product
        );
        setlistProducts(updatedProducts);
        addProduct(id, quantity);
    };

    const addProduct = (id: number, quantity: number): void => {
        const product = listProducts.find(product => product.id == id);
        if (!product) {
            return;
        }
        const newProductCart: Cart = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            total: product.price * quantity,
        };
        setCart([...cart, newProductCart]);
    };

    return (
        <View style={homeScreenStyles.container}>
            <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />
            <View style={homeScreenStyles.header}>
                <Text style={homeScreenStyles.title}>Productos</Text>
                <TouchableOpacity style={homeScreenStyles.cartButton} onPress={() => setShowModal(!showModal)}>
                    <Text style={homeScreenStyles.cartCount}>{cart.length}</Text>
                    <Icon name='shopping-cart' size={30} color={SECONDARY_COLOR} />
                </TouchableOpacity>
            </View>
            <BodyComponent>
                <FlatList
                    data={listProducts}
                    renderItem={({ item }) => <CardProduct item={item} updateStock={updateStock} />}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={homeScreenStyles.productList}
                />
            </BodyComponent>
            <ModalCart visible={showModal} setShowModal={() => setShowModal(!showModal)} cart={cart} />
        </View>
    );
};

const homeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: TERTIARY_COLOR,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 18,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: SECONDARY_COLOR,
    },
    cartButton: {
        position: 'relative',
    },
    cartCount: {
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: TERTIARY_COLOR,
        color: SECONDARY_COLOR,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
        position: 'absolute',
        top: -8,
        right: -8,
        zIndex: 1,
    },
    productList: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    }
});