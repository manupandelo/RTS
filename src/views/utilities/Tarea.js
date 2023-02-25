import React from 'react';
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import axios from 'axios';

export default function Tarea() {
  const columns = [
    {field: 'idtarea', hide: true},
    {field: 'nombre', headerName: 'Nombre', width: 250},
    {field: 'tipo', headerName: 'Tipo', width: 200},
    {field: 'especialidad', headerName: 'Especialidad', width: 200},
    {field:'codigo', headerName: 'Código', width: 200},
    {field: 'ubicacion', headerName: 'Ubicación', width: 200}
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
    const response = await axios.get('http://localhost:5000/tarea')
    setLoading(false)
    setData(response.data);
  };

    return(
      < DataGrid columns={columns}  loading={loading} components={{ Toolbar: GridToolbar }} rows={data} getRowSpacing={getRowSpacing} sx={{[`& .${gridClasses.row}`]: {bgcolor: (theme) => theme.palette.mode === 'light' ? grey[200] : grey[900]}}}/>
    )
}