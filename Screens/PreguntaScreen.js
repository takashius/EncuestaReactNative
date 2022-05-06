import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import Layout from '../components/Layout'
import { Button, Card, Title, Switch } from 'react-native-paper'
import { getData } from '../components/Store'
import { getEncuesta, setEncuesta } from '../api/user'
import { showMessage } from "react-native-flash-message"
import { AuthContext } from '../components/Store'

const PreguntaScreen = () => {
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(false);
    const  {preguntas, setPreguntas}  = useContext(AuthContext);

    useEffect(() => {
        try{
          getData('@token')
          .then( (val) => {
            setToken(val);
          })
        }catch(e){
          console.log(e);
        }
    }, []);

    useEffect(() => {
        try{
            getEncuesta(token)
              .then((data) => {
                setPreguntas(data)
              });
        }catch(e){
          console.log(e);
        }
    }, [token]);

    const formatData = () => {
        const items = preguntas.map((item) =>{
            return {
                pregunta: item.preguntaId,
                respuesta: item.respuesta
            }
        }); console.log(items)
        return items;
    }

    const updatePreguntas = () => {
        setLoading(true);
        setEncuesta(token, formatData())
          .then(() => {
            setLoading(false);
            showMessage({
            title: "!Update exitoso!",
            message: "Actualizado con éxito ",
            type: "success"
            });
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
            showMessage({
            title: "!Login error!",
            message: "Error al actualizar, intente nuevamente",
            type: "danger"
            });
          })
    }

    const handlerQuest = (value, index) => {
        const newData = [...preguntas]
        newData[index].respuesta = value;
        setPreguntas(newData);
    }

    const renderItem = ({ item, index }) => {
        return (
            <Card key={item.preguntaId} style={styles.container}>
                <Card.Content>
                    <Title style={styles.title}>{item.pregunta}</Title>
                    <Switch color="#9a73ef" value={item.respuesta} onValueChange={() => {
                        handlerQuest(!item.respuesta, index)
                    }} />
                </Card.Content>
            </Card>
        )
    };
    return (
        <Layout>
        <FlatList
            data={preguntas}
            renderItem={renderItem}
            keyExtractor={item => item.preguntaId}
        />
        
        <Button 
          loading={loading} 
          icon="content-save" 
          mode="contained" 
          style={styles.button}
          onPress={() => updatePreguntas()}>
            Guardar
        </Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop:15
    },
    container: {
        width: "100%",
        flexGrow: 0,
        marginVertical: 8,
    },
    title: {
        color: "#000000"
    }
});

export default PreguntaScreen
