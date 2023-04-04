import axios from 'axios';
import { Box, TextField, Button} from '@mui/material';
import React, { useState } from 'react';
import { useContextState, ActionTypes } from '../../Context';

 export default function Login() {
    const [user, setUSer] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
    const {setContextState} = useContextState();


    const handleLogin = async () => {
        if(!user || !password) {
            setError(true);
            setMensaje('Todos los campos son obligatorios');
            return;
        }
        setLoading(true);
        try{
           const response = await axios.post('http://localhost:5000/login', {user, password })
            if(response.data === false)  {
            setError(true);
            setMensaje('Usuario o contraseña incorrectos');
            setLoading(false);
            }
            else if(response.error) {
                setError(true);
                setMensaje(response.error);
                setLoading(false);
            }
            else{
                setLoading(false);
                setContextState({type: ActionTypes.SetUser, value: response.data});
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            }
        } 
        catch (error) {
            setError(true);
            setMensaje('Reintente más tarde');
            setLoading(false);
            return;
        }
    }

    const ButtonLogin = () => {
        if(loading) {
            return <Button variant="contained" disabled>Cargando...</Button>
        }
        return <Button variant="contained" onClick={handleLogin}>Ingresar</Button>
    }

    const ErrorText = () => {
        if(error) {
            return <p style={{color: 'red'}}>{mensaje}</p>
        }
        return null;
    }

    return (
        <Box component="form" noValidate autoComplete="off">
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'20vh'}}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPDBPkFZcvA943wLGLN9upY8IWC3a-JUIzfQ&usqp=CAU" alt="logo"/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'4vh'}}>
                <h1 style={{color:'black'}}>Inicio de sesión</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TextField
                    {...(error && {error: true})}
                    required
                    id="outlined"
                    label="Usuario"
                    onChange={(e) => {setUSer(e.target.value)}}
                />    
            </div>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TextField
                    {...(error && {error: true})}
                    required
                    id="outlined-required"
                    type={'password'}
                    label="Contraseña"
                    onChange={(e) => {setPassword(e.target.value)}}
                />
            </div><br/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ErrorText />
            </div><br/>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ButtonLogin/>
            </div>
        </Box>
    )
}
