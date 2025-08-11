import { StyleSheet } from "react-native";
import { INPUT_COLOR, PRIMARY_COLOR } from "../commons/constants";

export const styles = StyleSheet.create({
    titleWelcome: {
        fontSize: 17,
        fontWeight: 'bold',
        color: INPUT_COLOR
    },
    textDescription: {
        fontSize: 15,
        color: INPUT_COLOR,
        paddingVertical: 10
    },
    containerForm: {
        marginVertical: 10
     
    },
    iconForm:{
        position:'absolute',
        bottom:15,
        right:10

    },
    textRedirect:{
        fontSize: 15,
        fontWeight:'bold',
        color: INPUT_COLOR,
        textAlign:'center',
        marginTop:20
    },
    img : {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: -50
  },

});