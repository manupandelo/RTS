import React, {useState, useEffect} from "react";
import axios from "axios";
import { Button, TextField, Alert, IconButton, Box, Autocomplete } from "@mui/material";
import { Close } from '@mui/icons-material';

export default function AgregarSistema() {
    const [nombre, setNombre] = useState("");
    const [tag, setTag] = useState("");
    const [tipo, setTipo] = useState("");
    const [plano, setPlano] = useState("");
    const [subsistema, setSubsistema] = useState("");


    const [options, setOptions] = useState([]);
    const [options2, setOptions2] = useState([]);
    

    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [agregado, setAgregado] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        get();
    }, []);

    const get = async () => {
        try{
            const response = await axios.get('https://rts-back.onrender.com/idtipo',  /*{headers: {Authorization: `Bearer ${contextState.user[0].token}`}}*/)
            setOptions(response.data)
        }
        catch (error) {
            setError(true)
            setMensaje("Error al obtener los tipos, favor de recargar la pagina")
        }

        try{
            const response = await axios.get('https://rts-back.onrender.com/idsubsistemas',  /*{headers: {Authorization: `Bearer ${contextState.user[0].token}`}}*/)
            setOptions2(response.data)
        }
        catch (error) {
            setError(true)
            setMensaje("Error al obtener los subsistemas, favor de recargar la pagina")
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
                    {mensaje}
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
        if (nombre === "" || tag === "" || plano === "" || tipo === "" || subsistema === "") {
            setError(true);
            setMensaje("Favor de llenar todos los campos");
            setLoading(false)
        }
        else{
            const data = {
                nombre: nombre,
                idTipo: tipo,
                idSubSistema: subsistema,
                tag: tag,
                plano: plano
            }
            try{
                const response = await axios.post('https://rts-back.onrender.com/tag', data,  /*{headers: {Authorization: `Bearer ${contextState.user[0].token}`}}*/)
                setAgregado(true)
                setMensaje(response.data)
            }
            catch (error) {
                setError(true)
                setMensaje("Error al agregar el tag, favor de recargar la pagina")
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
            <h1>Agregar Tag</h1> <br />
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <TextField
                value={nombre}
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                onChange={(e) => setNombre(e.target.value)}
                />  
            </div>
            <br />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <TextField
                    value={tag}
                    id="outlined-basic"
                    label="Tag"
                    variant="outlined"
                    onChange={(e) => setTag(e.target.value)}
                />
            </div>
            <br />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <TextField
                    value={plano}
                    id="outlined-basic"
                    label="Plano"
                    variant="outlined"
                    onChange={(e) => setPlano(e.target.value)}
                />
            </div>
            <br />

            
            
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
            </div>
            <br />

            <br />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Autocomplete
                    options={options2}
                    getOptionLabel={(option) => option.nombre}
                    onChange={(event, newValue) => {
                        setSubsistema(newValue.id);
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                    <TextField {...params} label="Subsistema" variant="outlined" />
                    )}
                />
            </div>
            <br />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Add />
            </div>
        </Box>
    );
}
