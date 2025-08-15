import React, { useState } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, Alert, View, StyleSheet } from 'react-native';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../commons/constants';
import { BodyComponent } from '../components/BodyComponent';
import { InputComponent } from '../components/InputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { styles } from '../theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FormRegister {
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
}

interface Props {
    users: User[];
    addUser: (user: User) => void;
}


export const RegisterScreen = ({ users, addUser }: Props) => {
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    const [formRegister, setFormRegister] = useState<FormRegister>({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: ''
    });

    const navigation = useNavigation();

    const changeForm = (property: string, value: string): void => {
        setFormRegister({ ...formRegister, [property]: value });
    };

    const verifyUserName = () => {
        return users.find(user => user.username === formRegister.username);
    };

    const getIdUser = (): number => {
        return users.length + 1;
    };

    const handleRegister = (): void => {
        if (
            formRegister.name === '' ||
            formRegister.username === '' ||
            formRegister.email === '' ||
            formRegister.phone === '' ||
            formRegister.password === ''
        ) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        if (verifyUserName()) {
            Alert.alert('Error', 'El nombre de usuario ya existe');
            return;
        }

        const newUser: User = {
            id: getIdUser(),
            name: formRegister.name,
            username: formRegister.username,
            email: formRegister.email,
            phone: formRegister.phone,
            password: formRegister.password
        };

        addUser(newUser);
        Alert.alert('Usuario registrado', '¡Gracias por registrarte!');
        navigation.goBack();
    };

    return (
        <View style={registerScreenStyles.container}>
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <View style={registerScreenStyles.logoContainer}>
                <Image
                    style={styles.img}
                    source={{
                        uri: 'https://i.ibb.co/nNHSV9zN/logopoltech.png'
                    }}
                />
                <Text style={{...styles.titleWelcome, color: PRIMARY_COLOR}}>
                    Bienvenido al registro de POLTECH!
                </Text>
            </View>

            <View style={registerScreenStyles.formWrapper}>
                <InputComponent
                    placeholder="Nombre"
                    keyboardType="default"
                    changeForm={changeForm}
                    property="name"
                />
                <InputComponent
                    placeholder="Usuario"
                    keyboardType="default"
                    changeForm={changeForm}
                    property="username"
                />
                <InputComponent
                    placeholder="Correo"
                    keyboardType="email-address"
                    changeForm={changeForm}
                    property="email"
                />
                <InputComponent
                    placeholder="Teléfono"
                    keyboardType="number-pad"
                    changeForm={changeForm}
                    property="phone"
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

            <View style={registerScreenStyles.buttonWrapper}>
                <ButtonComponent textButton="Registrarse" onPress={handleRegister} />
            </View>

            <TouchableOpacity
                style={registerScreenStyles.loginLink}
                onPress={() =>
                    navigation.dispatch(CommonActions.navigate({ name: 'Login' }))
                }
            >
                <Text style={styles.textRegister}>
                    ¿Ya tienes una cuenta? Inicia sesión ahora
                </Text>
            </TouchableOpacity>
        </View>
    );
};


const registerScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: TERTIARY_COLOR,
        paddingVertical: 20,
    },
    logoContainer: {
        marginBottom: 20,
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
    loginLink: {
        marginTop: 15,
    }
});