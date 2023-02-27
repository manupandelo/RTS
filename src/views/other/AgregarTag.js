import React, {useState, useEffect} from "react";
import axios from "axios";
import { Button, TextField, Alert, IconButton, Box, Autocomplete } from "@mui/material";
import { Close } from '@mui/icons-material';

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

    useEffect(() => {
        get();

    }, []);

    const get = async () => {
        const response = await axios.get('http://localhost:5000/tipo')
        if(response && response.data) {
            setOptions(response.data)
        }else {
            console.log('Error')
            setMensaje("Error al obtener los tipos")
            setError(true)
        }

        const response1 = await axios.get('http://localhost:5000/especialidad')
        if(response1 && response1.data) {
            setOptions1(response1.data)  
        }else {
            console.log('Error')
            setMensaje("Error al obtener las especialidades")
            setError(true)
        }

        const response2 = await axios.get('http://localhost:5000/subsistema')
        if(response2 && response2.data) {
            setOptions2(response2.data)
        }else {
            console.log('Error')
            setMensaje("Error al obtener los subsistemas")
            setError(true)
        }

        const tareas = await axios.get('http://localhost:5000/tarea')
        if(tareas && tareas.data) {
            setTareas(tareas.data)
        }else {
            console.log('Error')
            setMensaje("Error al obtener las tareas")
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

    const handleAgregar = async () => {
        if (nombre === "" || tag === "" || plano === "" || descripcion === "" || tipo === "" || especialidad === "" || subsistema === "") {
            setError(true);
            setMensaje("Favor de llenar todos los campos");
            return;
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
            const response = await axios.post('http://localhost:5000/tag', data)
            console.log(response)
            if(response && response.data.affectedRows === 1) {
                console.log('Agregada el tag')
                console.log(tareas.length)
                setAgregado(true)
                for(let i = 0; i < tareas.length; i++){
                    if(tareas[i].idtipo === tipo){
                        console.log("Agregando tarea")
                        const data1 = {
                            idtag: response.data.insertId,
                            idtarea: tareas[i].id
                        }
                        const addRegistro = await axios.post('http://localhost:5000/registro', data1)
                        if(addRegistro && addRegistro.data.affectedRows === 1){
                            console.log('Agregada la tarea al registro')
                            setAgregado(true)
                        }else{
                            console.log('Error')
                            setError(true)
                            setMensaje("Error al agregar la tarea al registro")
                        }
                    }
                }
            } else {
                console.log('Error')
                setError(true)
                setMensaje("Error al agregar el tag")
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
            <h1>Agregar Tarea</h1> <br></br>
            <TextField
                value={nombre}
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
                value={tag}
                id="outlined-basic"
                label="Tag"
                variant="outlined"
                onChange={(e) => setTag(e.target.value)}
            />
            <TextField
                value={plano}
                id="outlined-basic"
                label="Plano"
                variant="outlined"
                onChange={(e) => setPlano(e.target.value)}
            />
            <TextField
                value={descripcion}
                id="outlined-basic"
                label="Descripcion"
                variant="outlined"
                onChange={(e) => setDescripcion(e.target.value)}
            />
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
            <Button variant="contained" onClick={handleAgregar}>Agregar</Button>
        </Box>
    );
}
