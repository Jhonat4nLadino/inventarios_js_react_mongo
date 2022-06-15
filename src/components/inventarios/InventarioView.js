import React, { useState, useEffect } from 'react';
import { getInventarios } from '../../services/inventarioService';
import { InventarioCard } from './InventarioCard';
import { InventarioNew } from './InventarioNew';
import Swal from 'sweetalert2';

export const InventarioView = () => {

  const [inventarios, setInventarios] = useState([]); //Declaración de la variable de estado que devuelve un objeto del formulario
  const [modal, setModal] = useState(false);

  const listarInventarios = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Loading...'
      })
      Swal.showLoading();
      const { data } = await getInventarios();//data contiene la información del inventarios.
      console.log(data);
      setInventarios(data);//Se obtiene la información del objeto. 
      Swal.close();//Cierra el Loading
    } catch (error) {
      console.log(error);
      Swal.close();
      let mensaje;
      if (error && error.response && error.response.data) {
        mensaje = error.response.data;//Error desde el backend
      } else {
        mensaje = 'Ocurrio un error, intente de nuevo';//Mensaje de error desde el front
      }
      Swal.fire('Error', mensaje, 'error');//Se muestra el error del backen en este alert
    }
  }
  useEffect(() => {
    listarInventarios();
  }, []);

  const handleModal = () => {
    setModal(!modal);
  }

  return (
    <div className="container-fluid">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          inventarios.map((inventario) => {
            return <InventarioCard key={inventario._id} inventario={inventario} />
          })
        }
      </div>
      {
        modal ? <InventarioNew handleModal={handleModal} listarInventarios={listarInventarios} /> :
          (<button className='btn btn-primary fab' onClick={handleModal}
          ><i className="fa-solid fa-plus"></i></button>)
      }
    </div>
  )
}
