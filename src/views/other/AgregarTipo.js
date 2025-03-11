import React, {useState, useEffect} from "react";
import axios from "axios";
import { Button, TextField, Alert, IconButton, Box, Autocomplete } from "@mui/material";
import { Close } from '@mui/icons-material';
import { use } from "react";

export default function AgregarTipo() {
    const [nombre, setNombre] = useState("");
    const [especialidad, setEspecialidad] = useState();

    const [options, setOptions] = useState([]);

    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [agregado, setAgregado] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        try{
            const response = await axios.get('https://rts-back.onrender.com/idespecialidad', /*{headers: {Authorization: `Bearer ${contextState.user[0].token}`}}*/)
            setOptions(response.data)
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
                Tipo agregado correctamente
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
        if (nombre === "" || especialidad === "") {
            setError(true);
            setMensaje("Los campos no pueden estar vacios");
            setLoading(false)
        }
        else{
            const data = {
                nombre: nombre,
                idEspecialidad: especialidad
            }

            console.log(data)
            try{
                await axios.post('https://rts-back.onrender.com/tipo', data, /* {headers: {Authorization: `Bearer ${contextState.user[0].token}`}}*/)
                setAgregado(true)
            }
            catch(error) {
                setError(true)
                setMensaje("Error al agregar el tipo")
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
            <h1>Agregar Tipo</h1> <br></br>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <TextField
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div><br />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option.nombre}
                    onChange={(event, newValue) => {
                        setEspecialidad(newValue.id);
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                    <TextField {...params} label="Especialidad" variant="outlined" />
                    )}
                />
            </div><br />



            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Add />
            </div>
        </Box>
    );
}
