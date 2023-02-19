import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';

export default function Subsistema() {
  const columns = [
    {field: 'id', hide: true},
    {field: 'numsubsistema', headerName: 'Subsistema', width: 200},
    {field: 'nombre', headerName: 'Nombre', width: 200},
    {field: 'fechainicio', headerName: 'Fecha Inicio', type: 'date', width: 200},
    {field: 'fechafinal', headerName: 'Fecha Final', type: 'date', width: 200},
    {field: 'nombresistema', headerName: 'Nombre Sistema', width: 200},
    {field: 'numsistema', headerName: 'Sistema', width: 200}
]

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get('http://localhost:5000/subsistema')
    console.log(response.data);
    setData(response.data);
  };

  if (data.length === 0) {
    return <div>Loading...</div>
  }
  else{
    return(
      < DataGrid columns={columns} components={{ Toolbar: GridToolbar }} rows={data} />
    )
  }
}