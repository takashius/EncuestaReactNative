import React, {useState, useContext} from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import Layout from '../components/Layout'
import { useNavigation } from '@react-navigation/native'
import { login } from '../api/user'
import {storeData, AuthContext} from '../components/Store'
import { showMessage } from "react-native-flash-message"

const LoginScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const  {setToken}  = useContext(AuthContext);

    const onSubmit = () => {
        try{
            if(!mail || !password){
                showMessage({
                    title: "!Login error!",
                    message: "Usuario y contraseña requeridos",
                    type: "danger"
                  });
            }else{
                setLoading(true);
                login(mail, password)
                .then((result)=>{ 
                    if(result.status === 200){
                        storeData('@token', result.data.token);
                        setToken(result.data.token);
                        showMessage({
                            title: "!Login exitoso!",
                            message: "Bienvenido ",
                            type: "success"
                          });
                    }else{
                        setLoading(false);
                        showMessage({
                            title: "!Login error!",
                            message: "Usuario yo contraseña incorrectos",
                            type: "danger"
                          });
                    }
                })
                .catch((e)=>{
                    setLoading(false);
                    showMessage({
                        title: "!Login error!",
                        message: "Usuario yo contraseña incorrectos",
                        type: "danger"
                      });
                });
            }
        }catch(e){
            console.log(e);
        }
    }

    return (
        <Layout>
            <View style={styles.inputBox}>
                <TextInput 
                    placeholder="Username"
                    onChangeText = {(text) => {setMail(text)}}
                    returnKeyType='go'
                    placeholderTextColor="#9a73ef" />
            </View>
            <View style={styles.inputBox}>
                <TextInput 
                    secureTextEntry={true}
                    onChangeText = {(text) => {setPassword(text)}}
                    placeholder="Password"
                    autoCorrect={false}
                    returnKeyType='go'
                    placeholderTextColor="#9a73ef" />
            </View>
            <Button loading={loading} icon="lock" mode="contained" onPress={() => onSubmit()}>
                Enviar
            </Button>
            <TouchableOpacity 
                style={styles.buttonDelete}
                onPress={() => {
                    navigation.navigate('RegistroScreen')
                }}
            >
                <Text style={styles.buttonRegistro}>Registrarse</Text>
            </TouchableOpacity>
        </Layout>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        width: "85%",
        marginBottom: 20
    },
    buttonRegistro: {
        padding: 10,
        color: "#9a73ef"
    },
});

export default LoginScreen
