import React, { useState, useEffect } from 'react'
import { createEstado, deleteEstado, getEstados } from '../../services/estadoService';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';


export const EstadoView = () => {

  const [estados, setEstados] = useState([]);
  const [valoresForm, setValoresForm] = useState({});
  const { nombre = '', estadoEquipo = '' } = valoresForm;

  //Trae la lista de estados
  const listarEstados = async () => {
    try {
      const { data } = await getEstados();
      setEstados(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    listarEstados();
  }, []);

  //Elimina un estado
  const eliminarEstado = (estadoId) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Eliminando estado...'
      })
      Swal.showLoading();
      deleteEstado(estadoId)
      Swal.close();
      listarEstados();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  //Detecta los cambios en las cajas de texto del formulario
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  }

  //Creando la información que viene del formulario
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const estado = {
      nombre: nombre,
      estado: estadoEquipo
    }
    console.log(estado);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Creando estado...'
      })
      Swal.showLoading();
      const { data } = await createEstado(estado);
      console.log(data);
      Swal.close();
      setValoresForm({ nombre: '', estadoEquipo: '' });
      listarEstados();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  return (
    (
      <div className='container-fluid my-2'>
        <div className='card'>
          <div>
            <h3> Lista Estados</h3>
            <hr />
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-12'>
                <form onSubmit={(e) => handleOnSubmit(e)}>
                  <div className='row'>
                    <div className='col'>
                      <div className='mb-3'>
                        <label className='form-label' >Nombre</label>
                        <input name='nombre' value={nombre} onChange={(e) => handleOnChange(e)} className='form-control' type='text' required></input>
                      </div>
                    </div>
                    <div className='col'>
                      <div className='mb-3'>
                        <label className='form-label' >Estado</label>
                        <select className="form-select" name='estadoEquipo' value={estadoEquipo} onChange={(e) => handleOnChange(e)} required>
                          <option value=''>...</option>
                          {
                            estados.map(estado => {
                              return <option key={estado._id} value={estado.nombre}>{estado.nombre}</option>
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className='btn btn-success'><i className="fa-solid fa-user-plus"></i> Agregar estado</button>
                  </div>
                </form>
              </div>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha creación</th>
                  <th scope="col">Fecha actualización</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {
                  estados.map(estado => {
                    return <tr key={estado._id}>
                      <td>{estado.nombre}</td>
                      <td>{estado.estado}</td>
                      <td>{moment(estado.fechaCreacion).format('MMM-DD-yy HH:mm')}</td>
                      <td>{moment(estado.fechaActualizacion).format('MMM-DD-yy HH:mm')}</td>
                      <td>
                        <Link to={`/estado-equipo/edit/${estado._id}`}>
                          <button className='btn btn-primary'><i className="fa-solid fa-user-pen"></i></button></Link>
                      </td>
                      <td>
                        <button className='btn btn-danger' onClick={() => eliminarEstado(estado._id)}><i className="fa-solid fa-user-xmark"></i></button>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  )
}
