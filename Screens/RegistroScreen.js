import React, {useState, useContext} from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import Layout from '../components/Layout'
import {storeData, AuthContext} from '../components/Store'
import { useNavigation } from '@react-navigation/native'
import { setUser } from '../api/user'
import { showMessage } from "react-native-flash-message"

const RegistroScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cedula, setCedula] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const  {setToken}  = useContext(AuthContext);

    const onSubmit = () => {
        try{

            const data = {
                name: name,
                lastname: lastName,
                email: mail,
                cedula: cedula,
                password: password
            }
            setLoading(true);
            const user = setUser(data)
            .then((result) => {
                if(result){
                    storeData('@token', result.token);
                    setToken(result.token);
                    showMessage({
                        title: "Login error!",
                        message: "Will show this message green",
                        type: "success"
                      });
                }else{
                    showMessage({
                        title: "Login error!",
                        message: "Will show this message green",
                        type: "danger"
                      });
                    setLoading(false);
                }
            })
            .catch((e) => {
                alert(e);
            });
        }catch(e){
            alert(e);
        }
    }

    return (
        <Layout>
            <View style={styles.inputBox}>
                <TextInput 
                    placeholder="Nombre"
                    value={name}
                    onChangeText = {text => setName(text)}
                    placeholderTextColor="#9a73ef" />
            </View>
            <View style={styles.inputBox}>
                <TextInput 
                    placeholder="Apellido"
                    onChangeText = {(text) => {setLastName(text)}}
                    placeholderTextColor="#9a73ef" />
            </View>
            <View style={styles.inputBox}>
                <TextInput 
                    placeholder="Cedula"
                    onChangeText = {(text) => {setCedula(text)}}
                    placeholderTextColor="#9a73ef" />
            </View>
            <View style={styles.inputBox}>
                <TextInput 
                    placeholder="Email"
                    onChangeText = {(text) => {setMail(text)}}
                    placeholderTextColor="#9a73ef" />
            </View>
            <View style={styles.inputBox}>
                <TextInput 
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText = {(text) => {setPassword(text)}}
                    autoCorrect={false}
                    returnKeyType='go'
                    placeholderTextColor="#9a73ef" />
            </View>
            <Button loading={loading} icon="send" mode="contained" onPress={() => onSubmit()}>
                Registrar
            </Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        width: "85%",
        marginBottom: 20
    },
});

export default RegistroScreen
