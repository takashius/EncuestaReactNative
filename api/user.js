import axios from "axios";

const url = "https://er-encuesta.herokuapp.com";

const setUser = async (user) => {
    try{
        const response = await axios.post(url + '/user', user); 
        return response.data;
    }catch(e){
        console.log('Registro error', e);
        return false;
    }
}

const getEncuesta = async (token) => {
    try{
        const response = await axios.get(url + '/encuesta', { headers: { Authorization: `Bearer ${token}` } }); 
        return response.data;
    }catch(e){
        console.log(e);
        return false;
    }
}

const setEncuesta = async (token, preguntas) => {
    try{
        const response = await axios.patch(url + '/encuesta', preguntas, { headers: { Authorization: `Bearer ${token}` } }); 
        return response.data;
    }catch(e){
        console.log(e);
        return false;
    }
}

const login = async (email, password) => {
    try{
        const userData = {email:email, password:password};
        const response = await axios.post(url + '/user/login', userData); 
        return {
            status: response.status,
            data: response.data
        };
    }catch(e){
        return {
            status: e.response.status,
            data: e.response.data
        };
    }
}

const logout = async (token) => {
    try{
        await axios.post(url + '/user/logout', null, { headers: { Authorization: `Bearer ${token}` } }); 
    }catch(e){
        console.log(e);
        return false;
    }
}

export {
    setUser,
    getEncuesta,
    setEncuesta,
    login,
    logout 
};