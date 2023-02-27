import React, {useState, useEffect} from "react";
import axios from "axios";
import { Button, TextField, Alert, IconButton, Box, Autocomplete } from "@mui/material";
import { Close } from '@mui/icons-material';
import { DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function AgregarSistema() {
    const [nombre, setNombre] = useState("");
    const [numero, setNumero] = useState("");
    const [sistema, setSistema] = useState("");
    const [fechafinal, setFechafinal] = useState(null);
    const [fechainicio, setFechainicio] = useState(null);


    const [options, setOptions] = useState([]);

    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [agregado, setAgregado] = useState(false);

    useEffect(() => {
        getSistemas();
    }, []);

    const getSistemas = async () => {
        const response = await axios.get('http://localhost:5000/sistema')
        if(response && response.data) {
            setOptions(response.data)
        }else {
            console.log('Error')
            setMensaje("Error al obtener los Sistemas")
            setError(true)
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
                Subsistema agregado correctamente
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
        if (nombre === "" || numero === "" || sistema === "" || fechafinal === "" || fechainicio === "") {
            setError(true);
            setMensaje("Favor de llenar todos los campos");
            return;
        }
        else{
            const data = {
                nombre: nombre,
                numsubsistema: numero,
                idsistema: sistema,
                fechafinal: fechafinal,
                fechainicio: fechainicio
            }
            const response = await axios.post('http://localhost:5000/subsistema', data)
            console.log(response)
            if(response && response.data.affectedRows === 1) {
                console.log('Agregado')
                setAgregado(true)
            } else {
                console.log('Error')
                setError(true)
                setMensaje("Error al agregar el subsistema")
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
            <h1>Agregar Subsistema</h1> <br></br>
            <TextField
                value={nombre}
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
                value={numero}
                id="outlined-basic"
                label="Numero"
                variant="outlined"
                onChange={(e) => setNumero(e.target.value)}
            />
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option.nombre}
                onChange={(event, newValue) => {
                    setSistema(newValue.idsistema);
                }}
                style={{ width: 300 }}
                renderInput={(params) => (
                <TextField {...params} label="Sistema" variant="outlined" />
                )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Fecha Inicio"
                    value={fechainicio}
                    onChange={(newValue) => {
                    setFechainicio(newValue);
                    console.log(fechainicio);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Fecha Final"
                    value={fechafinal}
                    onChange={(newValue) => {
                    setFechafinal(newValue);
                    console.log(fechafinal);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            
            <Button variant="contained" onClick={handleAgregar}>Agregar</Button>
        </Box>
    );
}
