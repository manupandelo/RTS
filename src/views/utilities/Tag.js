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
    {field: 'tarea', headerName: 'Tarea', width: 250},
    {field: 'realizado', headerName: 'Realizado', type:'boolean', width: 100, editable:'true'},
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
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Tareas</DialogTitle>
          <DialogContent style={{height:'400px'}}>
            <DataGrid columns={columns} rows={props.props} />
          </DialogContent>  
          <DialogActions>
            <Button onClick={handleClose}>Guardar Cambios</Button>
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
    {field: 'especialidad', headerName: 'Especialidad', width: 120},
    {field: 'tipo', headerName: 'Tipo', width: 150},
    {field: 'observaciones', headerName: 'Observaciones', width: 150}
  ]

  const getRowSpacing = React.useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true)
    const response = await axios.get('http://localhost:5000/tag')
    setLoading(false)
    setData(response.data);
  };

    return(
      < DataGrid columns={columns} loading={loading} components={{ Toolbar: GridToolbar }} rows={data} getRowSpacing={getRowSpacing} sx={{[`& .${gridClasses.row}`]: {bgcolor: (theme) => theme.palette.mode === 'light' ? grey[200] : grey[900]}}}/>
    )
}

