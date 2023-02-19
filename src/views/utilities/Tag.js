import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';

export default function Tag() {
  const columns = [
    {field: 'id', hide: true},
    {field: 'nombre', headerName: 'Nombre', width: 200},
    {field: 'proyecto', headerName: 'Proyecto', width: 200},
    {field: 'idsistema', headerName: 'Sistema', width: 200}
  ]

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get('http://localhost:5000/tag')
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