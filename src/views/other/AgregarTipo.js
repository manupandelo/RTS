import React, {useState} from "react";
import axios from "axios";
import { Button, TextField, Alert, IconButton, Box } from "@mui/material";
import { Close } from '@mui/icons-material';

export default function AgregarTipo() {
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [agregado, setAgregado] = useState(false);

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

    const handleAgregar = async () => {
        if (nombre === "") {
            setError(true);
            setMensaje("El campo nombre no puede estar vacio");
            return;
        }
        else{
            const data = {
                nombre: nombre
            }
            const response = await axios.post('http://localhost:5000/tipo', data)
            console.log(response)
            if(response && response.data.affectedRows === 1) {
                console.log('Agregado')
                setAgregado(true)
            } else {
                console.log('Error')
                setError(true)
                setMensaje("Error al agregar el tipo")
            }
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
            <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                onChange={(e) => setNombre(e.target.value)}
            />
            <Button variant="contained" onClick={handleAgregar}>Agregar</Button>
        </Box>
    );
}
