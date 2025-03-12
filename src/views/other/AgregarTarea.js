import {useState, useEffect} from "react";
import axios from "axios";
import { Button, TextField, Alert, IconButton, Box, Autocomplete } from "@mui/material";
import { Close } from '@mui/icons-material';
import React from "react";

export default function AgregarTarea() {
    const [nombre, setNombre] = useState('');
    const [codigo, setCodigo] = useState('');
    const [tipo, setTipo] = useState('');
    const [com, setCom] = useState('');

    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [agregado, setAgregado] = useState(false);
    const [loading, setLoading] = useState(false);

    const [options, setOptions] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get('https://rts-back.onrender.com/idtipo', /*{headers: {Authorization: `Bearer ${contextState.user[0].token}`}}*/)
            setOptions(response.data)
        } 
        catch (error) {
            setError(true)
            setMensaje("Error al obtener los tipos, favor de recargar la pagina")
        }
    }

    const Error = () => {
        if (error) {
            return (
                <Alert severity="error" sx={{ width: "100%" }}>
                    {mensaje}
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => {
                            setError(false);
                        }}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </Alert>
            );
        }
    }

    const Agregado = () => {
        if (agregado) {
            return (
                <Alert severity="success" sx={{ width: "100%" }}>
                Tarea agregada correctamente
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => {
                        setAgregado(false);
                    }}
                >
                    <Close fontSize="small" />
                </IconButton>
            </Alert>
        );
    }}

    const Add = () => {
        if(loading) {
            return <Button variant="contained" disabled>Cargando...</Button>
        }
        return <Button variant="contained" onClick={handleAgregar}>Ingresar</Button>   
    } 

    const handleAgregar = async () => {
        setLoading(true)
                if (nombre === "" || codigo === "" || tipo === "") {
                    setError(true);
                    setMensaje("Los campos no pueden estar vacios");
                    setLoading(false)
                }
                else{
                    const data = {
                        nombreTarea: nombre,
                        codigo: codigo,
                        idTipo: tipo, 
                        com: com
                    }
        
                    console.log(data)
                    try{
                        await axios.post('https://rts-back.onrender.com/registro', data, /* {headers: {Authorization: `Bearer ${contextState.user[0].token}`}}*/)
                        setAgregado(true)
                    }
                    catch(error) {
                        setError(true)
                        setMensaje("Error al agregar la tarea")
                    }
                    setLoading(false)
                }   
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <Agregado />
            <Error />
            <h1>Agregar Tarea</h1> <br></br>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <TextField
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div><br />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <TextField
                    id="outlined-basic"
                    label="Codigo"
                    variant="outlined"
                    onChange={(e) => setCodigo(e.target.value)}
                />
            </div><br />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option.nombre}
                    onChange={(event, newValue) => {
                        setTipo(newValue.id);
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                    <TextField {...params} label="Tipo" variant="outlined" />
                    )}
                />
            </div><br />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Autocomplete
                    options={[{ label: 'Comm', value: 1 }, { label: 'PreComm', value: 0 }]}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                        setCom(newValue.value);
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                    <TextField {...params} label="Com/PreCom" variant="outlined" />
                    )}
                />
            </div><br />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Add />
            </div>
        </Box>
    )
}