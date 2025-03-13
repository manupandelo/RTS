import React from 'react';
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import Button from '@mui/material/Button';
import getRowSpacing from '../functions/getRowSpacing';
import getTaskHandlers from '../functions/getTaskHandlers';

export default function TareasPendientes() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns =[
        {field: 'id', hide: true},
        {field: 'nombreTarea', headerName: 'Nombre', width: 300},
        {headerName: 'Marcar', field: 'acciones', width: 150, renderCell: (params) => { 
          return (
            <>
              <Button variant="contained" color="primary" size='small' onClick={getTaskHandlers(params).handleCompleteTask}>Realizar</Button>
              <Button variant="contained" color="grey" size='small' onClick={getTaskHandlers(params).handleNotApplicableTask}>No Aplica</Button>
            </>
          )
      }},
      {field: 'tag', headerName: 'Tag', width: 100},
        {field: 'tipo', headerName: 'Tipo', width: 150},
        {field:'com', headerName: 'COMM/PRECOMM', width: 130, renderCell: (params) => {
          if(params.value === 1){
            return 'Comisionado';
          } else{
            return 'PreComisionado';
          }
        }},
        {field: 'codigo', headerName: 'Código', width: 150},
    ]

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true)
        try{
            const response = await axios.get('https://rts-back.onrender.com/tareaspendientes',  /*{headers: {Authorization: `Bearer ${contextState.user[0].token}`}}*/)
            setLoading(false)
            setData(response.data);
        }
        catch (error) {
            setLoading(false)
        }
    };
    return(
      < DataGrid columns={columns} loading={loading} components={{ Toolbar: GridToolbar }} rows={data} getRowSpacing={getRowSpacing} sx={{[`& .${gridClasses.row}`]: {bgcolor: (theme) => theme.palette.mode === 'light' ? grey[200] : grey[900]}}}/>
    )
}
