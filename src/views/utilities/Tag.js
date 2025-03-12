import React from 'react';
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import axios from 'axios';
import '../../ui-component/progressBar/style.scss';
import { grey } from "@mui/material/colors";
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';

const ProgressBar = (props) => {
  return( 
      <div className="progressbar-container">
          <div className="progressbar-complete" style={{width: `${props.props.filledQuantity}%`}}>
              <div className="progressbar-liquid"></div>
          </div>
          <div className="progress">{props.props.filledQuantity}%</div>
      </div>
  )
}
 
function ModalTareas(props) {
  const [open, setOpen] = useState(false);

  const columns = [
    {field: 'id', headerName:'Id', hide: true},
    {field: 'nombreTarea', headerName: 'Tarea', width: 550},
    {field: 'done', headerName: 'Realizado', width: 100, editable: false, renderCell: (params) => {
      if (params.value === 1) {
        return 'Sí';
      } else if (params.value === 0) {
        return 'No';
      } else {
        return 'N/A';
      }
    }},
    {headerName: 'Marcar', field: 'acciones', width: 150, renderCell: (params) => { 
      const handleCompleteTask = async () => {
        try {
          await axios.put(`https://rts-back.onrender.com/realizarTarea`, {id: params.row.id});
          window.location.reload();
        } catch (error) {
          console.error('Error al marcar la tarea como realizada:', error);
        }
      };

      const handleUncompleteTask = async () => {
        try {
          await axios.put(`https://rts-back.onrender.com/desmarcarTarea`, {id: params.row.id});
          window.location.reload();
        } catch (error) {
          console.error('Error al desmarcar la tarea como realizada:', error);
        }
      };

      const handleNotApplicableTask = async () => {
        try {
          await axios.put(`https://rts-back.onrender.com/noaplica`, {id: params.row.id});
          window.location.reload();
        } catch (error) {
          console.error('Error al marcar la tarea como no aplicable:', error);
        }
      };

      if(params.row.done === 1){
        return (
          <>
            <Button variant="contained" color="secondary" size='small' onClick={handleUncompleteTask}>Desmarcar</Button>
            <Button variant="contained" color="grey" size='small' onClick={handleNotApplicableTask}>No Aplica</Button>
          </>
        );
      } else if(params.row.done === 0){
        return (
          <>
            <Button variant="contained" color="primary" size='small' onClick={handleCompleteTask}>Realizar</Button>
            <Button variant="contained" color="grey" size='small' onClick={handleNotApplicableTask}>No Aplica</Button>
          </>
        );
      } else {
        return (
          <>
            <Button variant="contained" color="primary" size='small' onClick={handleCompleteTask}>Realizar</Button>
            <Button variant="contained" color="grey" size='small' onClick={handleUncompleteTask}>Desmarcar</Button>
          </>
        );
      }
    }}
  ]

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <br />
      <Button variant="contained" color="error" size='large' onClick={handleClickOpen}>
        Ver Tareas
      </Button>
      <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
        <DialogTitle>Tareas</DialogTitle>
          <DialogContent style={{height:'600px', width:'850px', }}>
            <DataGrid columns={columns} rows={props.props} />
          </DialogContent>  
          <DialogActions>
            <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function Tag() {
  const columns = [
    {field: 'id', headerName:'Id', hide: true},
    {field: 'tag', headerName: 'Tag', width: 250},
    {field: 'nombre', headerName: 'Nombre', width: 250},
    {field: "filledQuantity", headerName: "Realizado", width: 150, renderCell: (params) => { return <ProgressBar props={params.row} /> } },
    {field: 'tareas', headerName: 'Tareas', width: 150, renderCell: (params) => { return <ModalTareas props={params.row.tareas}/> }},
    {field: 'subsistema', headerName: 'Subsistema', width: 250},
    {field: 'plano', headerName: 'P&id/Plano', width: 120},
    {field: 'tipo', headerName: 'Tipo', width: 150},
  ]

  const getRowSpacing = React.useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);


  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true)

    try {
      const tagResponse = await axios.get('https://rts-back.onrender.com/tag');
      setTags(tagResponse.data);
    } catch (error) {
      console.error('Error obteniendo los datos:', error);

    } finally {
      setLoading(false);
    }
  };

    return(
      < DataGrid columns={columns} loading={loading} components={{ Toolbar: GridToolbar }} rows={tags} getRowSpacing={getRowSpacing} sx={{[`& .${gridClasses.row}`]: {bgcolor: (theme) => theme.palette.mode === 'light' ? grey[200] : grey[900]}}}/>
    )
}

