import { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import getTaskHandlers from "./getTaskHandlers";

export default function ModalTareas(props) {
    const [open, setOpen] = useState(false);
  
    const columns = [
      {field: 'id', headerName:'Id', hide: true},
      {field: 'nombreTarea', headerName: 'Tarea', width: 500},
      {field:'com', headerName: 'Tipo', width: 130, renderCell: (params) => {
        if(params.value === 1){
          return 'Comisionado';
        } else{
          return 'PreComisionado';
        }
      }},
      {field: 'done', headerName: 'Realizado', width: 75, editable: false, renderCell: (params) => {
        if (params.value === 1) {
          return 'Sí';
        } else if (params.value === 0) {
          return 'No';
        } else {
          return 'N/A';
        }
      }},
      {headerName: 'Marcar', field: 'acciones', width: 150, renderCell: (params) => { 
        if(params.row.done === 1){
          return (
            <>
              <Button variant="contained" color="secondary" size='small' onClick={getTaskHandlers(params).handleUncompleteTask}>Desmarcar</Button>
              <Button variant="contained" color="grey" size='small' onClick={getTaskHandlers(params).handleNotApplicableTask}>No Aplica</Button>
            </>
          );
        } else if(params.row.done === 0){
          return (
            <>
              <Button variant="contained" color="primary" size='small' onClick={getTaskHandlers(params).handleCompleteTask}>Realizar</Button>
              <Button variant="contained" color="grey" size='small' onClick={getTaskHandlers(params).handleNotApplicableTask}>No Aplica</Button>
            </>
          );
        } else {
          return (
            <>
              <Button variant="contained" color="primary" size='small' onClick={getTaskHandlers(params).handleCompleteTask}>Realizar</Button>
              <Button variant="contained" color="secondary" size='small' onClick={getTaskHandlers(params).handleUncompleteTask}>Desmarcar</Button>
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
            <DialogContent style={{height:'600px', width:'900px', }}>
              <DataGrid columns={columns} rows={props.props} />
            </DialogContent>  
            <DialogActions>
              <Button onClick={handleClose}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }