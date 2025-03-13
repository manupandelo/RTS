import React from 'react';
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import getRowSpacing from '../functions/getRowSpacing';
import ProgressBar from '../functions/ProgressBar';

export default function Avance() {
    const columns = [
        {field: 'id', hide: true},
        {field: 'nombre', headerName: 'Numero', width: 200},
        {field: "filledQuantity", headerName: "Especialidad Realizada", width: 200, renderCell: (params) => { return <ProgressBar props={params.row} /> } }
    ]

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {   
        getData();
    }, []);
  
    const getData = async () => {
      setLoading(true)
      try{
        const response = await axios.get('https://rts-back.onrender.com/tarea'/*, {headers: {Authorization: `Bearer ${localStorage.}`}}*/)
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