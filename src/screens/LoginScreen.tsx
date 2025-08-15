import React, { useState } from 'react';
import { StatusBar, Text, View, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../commons/constants';
import { BodyComponent } from '../components/BodyComponent';
import { InputComponent } from '../components/InputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { styles } from '../theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FormLogin {
    username: string;
    password: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    password: string;
}

interface Props {
    users: User[];
}

const loginScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: TERTIARY_COLOR,
    },
    logoContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    formWrapper: {
        width: '85%',
        padding: 20,
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    buttonWrapper: {
        marginTop: 20,
        width: '85%',
    },
    registerLink: {
        marginTop: 20,
    }
});

export const LoginScreen = ({ users }: Props) => {
    const [formLogin, setFormLogin] = useState<FormLogin>({
        username: '',
        password: ''
    });

    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);
    const navigation = useNavigation();

    const changeForm = (property: string, value: string): void => {
        setFormLogin({ ...formLogin, [property]: value });
    };

    const verifyUser = () => {
        return users.find(
            user => user.username === formLogin.username && user.password === formLogin.password
        );
    };

    const handleLogin = (): void => {
        if (formLogin.username === '' || formLogin.password === '') {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        if (!verifyUser()) {
            Alert.alert('Error', 'Usuario o contraseña incorrectos');
            return;
        }

        navigation.dispatch(CommonActions.navigate({ name: 'Home' }));
    };

    return (
        <View style={loginScreenStyles.container}>
            <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />
            <View style={loginScreenStyles.logoContainer}>
                <Image
                    style={styles.img}
                    source={{
                        uri: 'https://i.ibb.co/nNHSV9zN/logopoltech.png'
                    }}
                />
                <Text style={{...styles.titleWelcome, color: PRIMARY_COLOR}}>¡Bienvenido a POLTECH!</Text>
                <Text style={{...styles.textDescription, color: PRIMARY_COLOR}}>
                    Tus proveedores de tecnología numero 1 del Ecuador.
                </Text>
            </View>

            <View style={loginScreenStyles.formWrapper}>
                <InputComponent
                    placeholder="Usuario"
                    keyboardType="default"
                    changeForm={changeForm}
                    property="username"
                />
                <InputComponent
                    placeholder="Contraseña"
                    keyboardType="default"
                    changeForm={changeForm}
                    property="password"
                    isPassword={hiddenPassword}
                />
                <Icon
                    name={hiddenPassword ? 'visibility' : 'visibility-off'}
                    size={24}
                    color={PRIMARY_COLOR}
                    style={{ ...styles.iconForm, bottom: 24, right: 18 }}
                    onPress={() => setHiddenPassword(!hiddenPassword)}
                />
            </View>

            <View style={loginScreenStyles.buttonWrapper}>
                <ButtonComponent textButton="Iniciar Sesión" onPress={handleLogin} />
            </View>

            <TouchableOpacity
                style={loginScreenStyles.registerLink}
                onPress={() =>
                    navigation.dispatch(CommonActions.navigate({ name: 'Register' }))
                }
            >
                <Text style={styles.textRegister}>
                    ¿No tienes una cuenta? Regístrate ahora.
                </Text>
            </TouchableOpacity>
        </View>
    );
};