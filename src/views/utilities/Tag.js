import React from 'react';
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import axios from 'axios';
import { grey } from "@mui/material/colors";
import ModalTareas from '../functions/ModalTarea';
import ProgressBar from '../functions/ProgressBar';
import getRowSpacing from '../functions/getRowSpacing';

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

