import React, {useState, useEffect} from "react";
import axios from "axios";
import { Button, TextField, Alert, IconButton, Box, Autocomplete } from "@mui/material";
import { Close } from '@mui/icons-material';

export default function AgregarSistema() {
    const [nombre, setNombre] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [tipo, setTipo] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [codigo, setCodigo] = useState("");


    const [options, setOptions] = useState([]);
    const [options1, setOptions1] = useState([]);

    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [agregado, setAgregado] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        get();
    }, []);

    const get = async () => {
        try{
            const response = await axios.get('http://localhost:5000/tipo', {headers: {Authorization: `Bearer ${contextState.user[0][0].token}`}})
            setOptions(response.data)
        }
        catch (error) {
            setError(true)
            setMensaje("Error al obtener los tipos, favor de recargar la pagina")
        }

        try{
            const response1 = await axios.get('http://localhost:5000/especialidad', {headers: {Authorization: `Bearer ${contextState.user[0][0].token}`}})
            setOptions1(response1.data)
        }
        catch (error) {
            setError(true)
            setMensaje("Error al obtener las especialidades, favor de recargar la pagina")
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
        }
    }

    const Add = () => {
        if(loading) {
            return <Button variant="contained" disabled>Cargando...</Button>
        }
        return <Button variant="contained" onClick={handleAgregar}>Ingresar</Button>
    }


    const handleAgregar = async () => {
        setLoading(true)
        if (nombre === "" || ubicacion === "" || codigo === "" || tipo === "" || especialidad === "") {
            setError(true);
            setMensaje("Favor de llenar todos los campos");
            setLoading(false)
        }
        else{
            const data = {
                nombre: nombre,
                ubicacion: ubicacion,
                codigo: codigo,
                idtipo: tipo,
                idespecialidad: especialidad
            }
            try{
                await axios.post('http://localhost:5000/tarea', data,  {headers: {Authorization: `Bearer ${contextState.user[0][0].token}`}})
                setAgregado(true)
            }
            catch (error) {
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
                    value={nombre}
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div><br/>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <TextField
                    value={codigo}
                    id="outlined-basic"
                    label="Codigo"
                    variant="outlined"
                    onChange={(e) => setCodigo(e.target.value)}
                />
            </div><br/>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <TextField
                    value={ubicacion}
                    id="outlined-basic"
                    label="Ubicacion"
                    variant="outlined"
                    onChange={(e) => setUbicacion(e.target.value)}
                />
            </div><br/>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option.nombre}
                    onChange={(event, newValue) => {
                        setTipo(newValue.idtipo);
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                    <TextField {...params} label="Tipo" variant="outlined" />
                    )}
                />
            </div><br/>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Autocomplete
                    options={options1}
                    getOptionLabel={(option) => option.nombre}
                    onChange={(event, newValue) => {
                        setEspecialidad(newValue.idespecialidad);
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                    <TextField {...params} label="Especialidad" variant="outlined" />
                    )}
                />
            </div><br/>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Add />
            </div>
        </Box>
    );
}
