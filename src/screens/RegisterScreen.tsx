import React, { useState } from 'react';
import { Image, StatusBar, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { PRIMARY_COLOR } from '../commons/constants';
import { TitleComponent } from '../components/TitleComponent';
import { BodyComponent } from '../components/BodyComponent';
import { InputComponent } from '../components/InputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { styles } from '../theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';


interface FormRegister {
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
}


interface UserRegister {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
}

export const RegisterScreen = () => {

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
    }

    
    const handleRegister = (): void => {
            if (formRegister.name == '' || formRegister.username == '' || formRegister.email == '' || formRegister.phone == '' || formRegister.password == '') {
                Alert.alert('Error', 'Por favor, complete todos los campos');
                return;
            }
                console.log(formRegister);
    }
    
    return (
        <View>
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <TitleComponent title="Regístrate" />
            <BodyComponent>
                <Image style={styles.img} 
                                   source={{
                                      uri: 'https://i.ibb.co/nNHSV9zN/logopoltech.png'
                                          }}/>
                <Text style={styles.titleWelcome}>
                    Bienvenido al registro de POLTECH!
                </Text>
                
                <View style={styles.containerForm}>
                    <InputComponent placeholder='Nombre'
                        keyboardType='default'
                        changeForm={changeForm}
                        property='name' />
                    <InputComponent
                        placeholder='Usuario'
                        keyboardType='default'
                        changeForm={changeForm}
                        property='username' />
                    <InputComponent
                        placeholder='Correo'
                        keyboardType='email-address'
                        changeForm={changeForm}
                        property='email' />
                    <InputComponent
                        placeholder='Telefono'
                        keyboardType='number-pad'
                        changeForm={changeForm}
                        property='phone' />
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
                <ButtonComponent textButton='Iniciar' onPress={handleRegister}    />
                <TouchableOpacity
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}>
                    <Text style={styles.textRedirect}>
                        Ya tienes una cuenta? Iniciar sesión ahora
                    </Text>
                </TouchableOpacity>
            </BodyComponent>
        </View>
    )
}