import React, { useState, useEffect } from 'react';
import { getInventarios } from '../../services/inventarioService';
import { InventarioCard } from './InventarioCard';
import { InventarioNew } from './InventarioNew';

export const InventarioView = () => {

  const [inventarios, setInventarios] = useState([]); //Declaración de la variable de estado que devuelve un objeto.
  const [modal, setModal] = useState(false);

  const listarInventarios = async () => {
    try {
      const { data } = await getInventarios();//data contiene la información del inventarios.
      console.log(data);
      setInventarios(data);//Se obtiene la información del objeto. 
    } catch (error) {
      console.log(error);
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
