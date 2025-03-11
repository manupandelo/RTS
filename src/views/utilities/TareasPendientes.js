import React from 'react';
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import axios from 'axios';

export default function TareasPendientes() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns =[
        {field: 'id', hide: true},
        {field: 'nombreTarea', headerName: 'Nombre', width: 250},
        {field: 'tipo', headerName: 'Tipo', width: 200},
        {field: 'codigo', headerName: 'Código', width: 200},
        {field: 'tag', headerName: 'Tag', width: 200}
    ]

    const getRowSpacing = React.useCallback((params) => {
        return {
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        };
    }, []);

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
