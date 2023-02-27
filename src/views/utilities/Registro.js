import React from 'react';
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import axios from 'axios';

export default function Registro() {
    const columns = [
      {field: 'id', headerName:'Id', hide: true},
      {field: 'tag', headerName: 'Tag', width: 400},
      {field: 'nombretag', headerName: 'Nombre Tag', width: 400}, 
      {field: 'tarea', headerName: 'Tarea', width: 200},
      {field: 'realizado', headerName: 'Realizado', type:'boolean', width: 200, editable:'true'}
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
      const response = await axios.get('http://localhost:5000/registro-tareas')
      setLoading(false)
      setData(response.data);
    };

      return(
        < DataGrid columns={columns} loading={loading} components={{ Toolbar: GridToolbar }} rows={data} getRowSpacing={getRowSpacing} sx={{[`& .${gridClasses.row}`]: {bgcolor: (theme) => theme.palette.mode === 'light' ? grey[200] : grey[900]}}}/>
      )
  }