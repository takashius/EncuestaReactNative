import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import LoginScreen from './Screens/LoginScreen';
import RegistroScreen from './Screens/RegistroScreen';
import PreguntaScreen from './Screens/PreguntaScreen';
import FlashMessage from "react-native-flash-message";
import { logout } from './api/user'
import { getData, clearAll, AuthContext } from './components/Store';

const Stack = createNativeStackNavigator();

const App = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [preguntas, setPreguntas] = useState([]);
  
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

  return (
    <AuthContext.Provider value={{setToken, preguntas, setPreguntas}}>
      <NavigationContainer>
        <Stack.Navigator>
          {token ? (<>
            <Stack.Screen
            name= "PreguntaScreen"
            component={PreguntaScreen}
            options={()=> ({
              title: "Encuesta",
              headerRight: () => (
                <Button loading={loading} icon="logout" mode="text" onPress={() => {
                  setLoading(true);
                  logout(token)
                    .then(async () => {
                      setToken(null);
                      await clearAll();
                      setLoading(false);
                    })
                    .catch((e) => {
                      console.log(e);
                      setLoading(false);
                    })
                  }}>
                  Logout
                </Button>
              ),
            })} />
          </>):(<>
            <Stack.Screen
              name= "LoginScreen"
              component={LoginScreen}
              options={()=> ({
                title: "Iniciar Sesion",
              })} />
            <Stack.Screen
              name= "RegistroScreen"
              component={RegistroScreen}
              options={()=> ({
                title: "Registrarse",
              })} />
          </>)}
          
        </Stack.Navigator>
        <FlashMessage position="center" />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;