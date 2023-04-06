import React, {useState, useEffect} from "react";
import axios from "axios";
import { Button, TextField, Alert, IconButton, Box, Autocomplete } from "@mui/material";
import { Close } from '@mui/icons-material';
import { useContextState } from "../../Context";

export default function AgregarSistema() {
    const [nombre, setNombre] = useState("");
    const [tag, setTag] = useState("");
    const [tipo, setTipo] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [plano, setPlano] = useState("");
    const [subsistema, setSubsistema] = useState("");
    const [descripcion, setDescripcion] = useState("Sin observaciones");


    const [options, setOptions] = useState([]);
    const [options1, setOptions1] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [tareas, setTareas] = useState([]);

    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [agregado, setAgregado] = useState(false);
    const [loading, setLoading] = useState(false);

    const {contextState} = useContextState();

    useEffect(() => {
        get();
    }, []);

    const get = async () => {
        try{
            const response = await axios.get('http://localhost:5000/tipo',  {headers: {Authorization: `Bearer ${contextState.user[0].token}`}})
            setOptions(response.data)
        }
        catch (error) {
            setError(true)
            setMensaje("Error al obtener los tipos, favor de recargar la pagina")
        }

        try{
            const response = await axios.get('http://localhost:5000/especialidad',  {headers: {Authorization: `Bearer ${contextState.user[0].token}`}})
            setOptions1(response.data)
        }
        catch (error) {
            setError(true)
            setMensaje("Error al obtener las especialidades, favor de recargar la pagina")
        }

        try{
            const response = await axios.get('http://localhost:5000/subsistema',  {headers: {Authorization: `Bearer ${contextState.user[0].token}`}})
            setOptions2(response.data)
        }
        catch (error) {
            setError(true)
            setMensaje("Error al obtener los subsistemas, favor de recargar la pagina")
        }

        try{
            const response = await axios.get('http://localhost:5000/tarea',  {headers: {Authorization: `Bearer ${contextState.user[0].token}`}})
            setTareas(response.data)
        }
        catch (error) {
            setError(true)
            setMensaje("Error al obtener las tareas, favor de recargar la pagina")
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
        if (nombre === "" || tag === "" || plano === "" || descripcion === "" || tipo === "" || especialidad === "" || subsistema === "") {
            setError(true);
            setMensaje("Favor de llenar todos los campos");
            setLoading(false)
        }
        else{
            const data = {
                nombre: nombre,
                observaciones: descripcion,
                idtipo: tipo,
                idespecialidad: especialidad,
                idsubsistema: subsistema,
                tag: tag,
                plano: plano
            }
            try{
                const response = await axios.post('http://localhost:5000/tag', data,  {headers: {Authorization: `Bearer ${contextState.user[0].token}`}})
                setAgregado(true)
                for(let i = 0; i < tareas.length; i++){
                    if(tareas[i].idtipo === tipo){
                        const data1 = {
                            idtag: response.data.insertId,
                            idtarea: tareas[i].id
                        }

                        try{
                            await axios.post('http://localhost:5000/registro', data1,  {headers: {Authorization: `Bearer ${contextState.user[0].token}`}})
                        }
                        catch (error) {
                            setError(true)
                            setMensaje("Error al agregar el registro, favor de recargar la pagina")
                        }
                    }    
                }
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
            <h1>Agregar Tarea</h1> <br />
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
                <TextField
                    value={descripcion}
                    id="outlined-basic"
                    label="Descripcion"
                    variant="outlined"
                    onChange={(e) => setDescripcion(e.target.value)}
                />
            </div>
            <br />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option.nombre}
                    onChange={(event, newValue) => {
                        setTipo(newValue.idtipo);
                        console.log(newValue.idtipo)
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                    <TextField {...params} label="Tipo" variant="outlined" />
                    )}
                
                />
            </div>
            <br />

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
            </div>
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
