import React, {useState} from "react";
import axios from "axios";
import { Button, TextField, Alert, IconButton, Box } from "@mui/material";
import { Close } from '@mui/icons-material';
import { useContextState } from "../../Context";

export default function AgregarProyecto() {
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [agregado, setAgregado] = useState(false);
    const [loading, setLoading] = useState(false);

    const {contextState} = useContextState();

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
                Proyecto agregado correctamente
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
        if (nombre === "") {
            setError(true);
            setMensaje("El campo nombre no puede estar vacio");
            setLoading(false)
        }
        else{
            const data = {
                nombre: nombre
            }
            try{
                await axios.post('http://localhost:5000/proyecto', data, {headers: {Authorization: `Bearer ${contextState.user[0].token}`}})
                setAgregado(true)
            }catch(error){
                setError(true);
                setMensaje("Error al agregar el proyecto");
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
            <h1>Agregar Proyecto</h1> <br></br>
            
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <TextField
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div><br />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Add />
            </div>
        </Box>
    );
}