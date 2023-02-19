import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';

export default function Tarea() {
  const columns = [
    {field: 'idtarea', hide: true},
    {field: 'nombre', headerName: 'Nombre', width: 200},
    {field: 'tipo', headerName: 'Tipo', width: 200},
    {field: 'especialidad', headerName: 'Especialidad', width: 200},
    {field:'codigo', headerName: 'Código', width: 200},
    {field: 'ubicacion', headerName: 'Ubicación', width: 200}
]

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get('http://localhost:5000/tarea')
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