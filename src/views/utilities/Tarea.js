import React from 'react';
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import axios from 'axios';

export default function Tarea() {
  const columns = [
    {field: 'idtarea', hide: true},
    {field: 'nombreTarea', headerName: 'Nombre', width: 350},
    {field: 'tipo', headerName: 'Tipo', width: 200},
    {field:'codigo', headerName: 'Código', width: 200},
    {field:'com', headerName: 'Tipo', width: 150, renderCell: (params) => {
      if(params.value === 1){
        return 'Comisionado';
      } else{
        return 'PreComisionado';
      }
    }}
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
    try{
      const response = await axios.get('https://rts-back.onrender.com/tareas',  /*{headers: {Authorization: `Bearer ${contextState.user[0].token}`}}*/)
      setLoading(false)
      console.log(response.data)
      setData(response.data);
    }
    catch (error) {

      setLoading(false)
    }
  };

    return(
      < DataGrid columns={columns}  loading={loading} components={{ Toolbar: GridToolbar }} rows={data} getRowSpacing={getRowSpacing} sx={{[`& .${gridClasses.row}`]: {bgcolor: (theme) => theme.palette.mode === 'light' ? grey[200] : grey[900]}}}/>
    )
}