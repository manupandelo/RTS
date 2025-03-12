import React from 'react';
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import '../../ui-component/progressBar/style.scss';

const ProgressBar = (props) => {
  return( 
      <div className="progressbar-container">
          <div className="progressbar-complete" style={{width: `${props.props.filledQuantity}%`}}>
              <div className="progressbar-liquid"></div>
          </div>
          <div className="progress">{props.props.filledQuantity}%</div>
      </div>
  )
}

export default function Sistema() {
  const columns = [
    {field: 'id', hide: true},
    {field: 'nombre', headerName: 'Nombre', width: 200},
    {field: 'proyecto', headerName: 'Proyecto', width: 200},
    {field: 'numSistema', headerName: 'Sistema', width: 200},
    {field: "filledQuantity", headerName: "Realizado", width: 150, renderCell: (params) => { return <ProgressBar props={params.row} /> } },
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
      const response = await axios.get('https://rts-back.onrender.com/sistema'/*, {headers: {Authorization: `Bearer ${contextState.user[0].token}`}}*/)
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
