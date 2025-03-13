import React from 'react';
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import ProgressBar from '../functions/ProgressBar';
import getRowSpacing from '../functions/getRowSpacing';

export default function Subsistema() {
  const columns = [
    {field: 'id', hide: true},
    {field: 'numSubSistema', headerName: 'Subsistema', width: 200},
    {field: 'nombre', headerName: 'Nombre', width: 150},
    {field: 'fechainicio', headerName: 'Fecha Inicio', width: 110},
    {field: 'fechafinal', headerName: 'Fecha Final', width: 110},
    {field: 'nombreSistema', headerName: 'Nombre Sistema', width: 200},
    {field: 'numSistema', headerName: 'Sistema', width: 100},
    {field: "filledQuantity", headerName: "Realizado", width: 150, renderCell: (params) => { return <ProgressBar props={params.row} /> } },
  ]

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true)
    try{
      const response = await axios.get('https://rts-back.onrender.com/subsistema', /*{headers: {Authorization: `Bearer ${localStorage}}}}*/)
      setLoading(false)
      console.log(response.data)
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