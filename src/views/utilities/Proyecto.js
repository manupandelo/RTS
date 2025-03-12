import React from 'react';
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { useContextState } from '../../Context';
import '../../ui-component/progressBar/style.scss';

export default function Sistema() {
  const columns = [
    {field: 'id', hide: true},
    {field: 'nombre', headerName: 'Nombre', width: 200},
  ]

  const getRowSpacing = React.useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {contextState} = useContextState();

  useEffect(() => {   
      getData();
  }, []);

  const getData = async () => {
    setLoading(true)
    try{
      const response = await axios.get('https://rts-back.onrender.com/proyecto'/*, {headers: {Authorization: `Bearer ${localStorage.}`}}*/)
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
