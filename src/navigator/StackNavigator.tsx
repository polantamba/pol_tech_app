import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { useState } from "react";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";



export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;

}
const users: User[] = [
    { id: 1, name: 'Juan', username: 'juan1', email: 'juan@gmail.com', phone: '123456', password: '123456' },
    { id: 2, name: 'Pepe', username: 'pepe@gmail.com', email: 'pepe@gmail.com', phone: '123456', password: '123456' },
];

const Stack = createStackNavigator();

export const StackNavigator = () => {

    //use state gestiona el estado de los usuarios
    const [listUsers, setListUsers] = useState<User[]>(users);

    //funcion para agregar nuevos usuarios
    const addUser = (user: User) => {
        //modifica el estado del arreglo 
        setListUsers([...listUsers, user]);
    }



    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: '#3A6373'
                }
            }}
        >

            <Stack.Screen name="Login" options={{ headerShown: false }} children={()=><LoginScreen users={listUsers} />} />
            <Stack.Screen name="Register" options={{ headerShown: false }} children={()=><RegisterScreen users={listUsers} addUser={addUser} />} />
            <Stack.Screen name="Home" options={{ headerShown: false }} children={()=><HomeScreen />} />
            
        </Stack.Navigator>
    );
}
