import React, { useState } from 'react';
import { StatusBar, Text, View, KeyboardTypeOptions, Alert, TouchableOpacity } from 'react-native';
import { TitleComponent } from '../components/TitleComponent';
import { PRIMARY_COLOR } from '../commons/constants';
import { BodyComponent } from '../components/BodyComponent';
import { InputComponent } from '../components/InputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { styles } from '../theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';

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



export const LoginScreen = () => {

    const [formLogin, setFormLogin] = useState<FormLogin>({
        username: '',
        password: ''
    });

    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    const navigation = useNavigation();

    const changeForm = (property: string, value: string): void => {

        setFormLogin({ ...formLogin, [property]: value });
    }


    const handleLogin = (): void => {
        if (formLogin.username == '' || formLogin.password == '') {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }


        console.log(formLogin);
    }

    return (
        <View>
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <TitleComponent title="Iniciar Sesión" />
            <BodyComponent>
                <View>
                    <Image style={styles.img}
                        source={{
                            uri: 'https://i.ibb.co/nNHSV9zN/logopoltech.png'
                        }} />
                </View>
                <Text style={styles.titleWelcome}>
                    Bienvenido a POLTECH!
                </Text>

                <View style={styles.containerForm}>
                    <InputComponent placeholder='Usuario' keyboardType='default' changeForm={changeForm} property='username' />
                    <InputComponent placeholder='Contraseña'
                        keyboardType='default'
                        changeForm={changeForm}
                        property='password'
                        isPassword={hiddenPassword} />
                    <Icon name={hiddenPassword ? 'visibility' : 'visibility-off'}
                        size={20}
                        color={PRIMARY_COLOR}
                        style={styles.iconForm}
                        onPress={() => setHiddenPassword(!hiddenPassword)} />
                </View>
                <ButtonComponent textButton='Iniciar' onPress={handleLogin} />
                <TouchableOpacity
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}>
                    <Text style={styles.textRedirect}>
                        No tienes una Cuenta? Regístrate ahora.
                    </Text>
                </TouchableOpacity>
            </BodyComponent>
        </View>
    )
}