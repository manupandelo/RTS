import React, {useState, useEffect} from "react";
import axios from "axios";
import { Button, TextField, Alert, IconButton, Box, Autocomplete } from "@mui/material";
import { Close } from '@mui/icons-material';
import { DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useContextState } from "../../Context";

export default function AgregarSistema() {
    const [nombre, setNombre] = useState("");
    const [numero, setNumero] = useState("");
    const [sistema, setSistema] = useState("");
    const [fechafinal, setFechafinal] = useState(null);
    const [fechainicio, setFechainicio] = useState(null);


    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [agregado, setAgregado] = useState(false);

    const {contextState} = useContextState();

    useEffect(() => {
        getSistemas();
    }, []);

    const getSistemas = async () => {
        try{
            await axios.get('http://localhost:5000/sistema', {headers: {Authorization: `Bearer ${contextState.user[0][0].token}`}})
            setOptions(response.data)
        }
        catch (error) {
            setError(true)
            setMensaje("Error al obtener los sistemas, favor de recargar la pagina")
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

    const Add = () => {
        if(loading) {
            return <Button variant="contained" disabled>Cargando...</Button>
        }
        return <Button variant="contained" onClick={handleAgregar}>Ingresar</Button>
    }

    const handleAgregar = async () => {
        setLoading(true)
        if (nombre === "" || numero === "" || sistema === "" || fechafinal === "" || fechainicio === "") {
            setError(true);
            setMensaje("Favor de llenar todos los campos");
            setLoading(false)
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
            try{
                await axios.post('http://localhost:5000/subsistema', data, {headers: {Authorization: `Bearer ${contextState.user[0][0].token}`}})
                setAgregado(true)
            }catch(error) {
                setError(true)
                setMensaje("Error al agregar el subsistema, favor de intentar de nuevo")
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
            <h1>Agregar Subsistema</h1> <br></br>
            
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
                    value={numero}
                    id="outlined-basic"
                    label="Numero"
                    variant="outlined"
                    onChange={(e) => setNumero(e.target.value)}
                />
            </div><br/>

            <div style={{display: 'flex', justifyContent: 'center'}}>
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
            </div><br/>

            <div style={{display: 'flex', justifyContent: 'center'}}>
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
            </div><br/>
            
            <div style={{display: 'flex', justifyContent: 'center'}}>
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
            </div><br/>
            
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Add />
            </div>
        </Box>
    );
}
