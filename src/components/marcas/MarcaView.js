import React, { useState, useEffect } from 'react'
import { getEstados } from '../../services/estadoService';
import { createMarca, getMarcas, deleteMarca } from '../../services/marcaService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';


export const MarcaView = () => {

  const [marcas, setMarcas] = useState([]);
  const [estados, setEstados] = useState([]);

  const [valoresForm, setValoresForm] = useState({});
  const { nombre = '', estadoEquipo = '' } = valoresForm;

  useEffect(() => {
    const listarEstados = async () => {
      try {
        const { data } = await getEstados();
        setEstados(data);
      } catch (error) {
        console.log(error);
      }
    }
    listarEstados();
  }, []);

  const listarMarcas = async () => {
    try {
      const { data } = await getMarcas();
      setMarcas(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    listarMarcas();
  }, []);


  const eliminarMarca = (marcaId) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Eliminando usuario...'
      })
      Swal.showLoading();
      deleteMarca(marcaId)
      Swal.close();
      listarMarcas();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const marca = {
      nombre: nombre,
      estado: estadoEquipo
    }
    console.log(marca);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Creando usuario...'
      })
      Swal.showLoading();
      const { data } = await createMarca(marca);
      console.log(data);
      Swal.close();
      setValoresForm({ nombre: '', estadoEquipo: '' });
      listarMarcas();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  return (
    <div className='container-fluid my-2'>
      <div className='card'>
        <div>
          <h3> Lista Marcas</h3>
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
                  <button className='btn btn-success'><i className="fa-solid fa-user-plus"></i> Agregar marca</button>
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
                marcas.map(marca => {
                  return <tr key={marca._id}>
                    <td>{marca.nombre}</td>
                    <td>{marca.estado}</td>
                    <td>{moment(marca.fechaCreacion).format('MMM-DD-yy HH:mm')}</td>
                    <td>{moment(marca.fechaActualizacion).format('MMM-DD-yy HH:mm')}</td>
                    <td>
                      <Link to={`/marca/edit/${marca._id}`}>
                        <button className='btn btn-primary'><i className="fa-solid fa-user-pen"></i></button></Link>
                    </td>
                    <td>
                      <button className='btn btn-danger' onClick={() => eliminarMarca(marca._id)}><i className="fa-solid fa-user-xmark"></i></button>
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
}