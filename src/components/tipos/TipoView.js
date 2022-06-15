import React, { useState, useEffect } from 'react'
import { getEstados } from '../../services/estadoService';
import { createTipo, getTipos, deleteTipo } from '../../services/tipoService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';


export const TipoView = () => {

  const [tipos, setTipos] = useState([]);
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


  const listarTipos = async () => {
    try {
      const { data } = await getTipos();
      setTipos(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    listarTipos();
  }, []);


  const eliminarTipo = (tipoId) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Eliminando tipo...'
      })
      Swal.showLoading();
      deleteTipo(tipoId)
      Swal.close();
      listarTipos();
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
    const tipo = {
      nombre: nombre,
      estado: estadoEquipo
    }
    console.log(tipo);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Creando tipo...'
      })
      Swal.showLoading();
      const { data } = await createTipo(tipo);
      console.log(data);
      Swal.close();
      setValoresForm({ nombre: '', estadoEquipo: '' })
      listarTipos();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  return (
    <div className='container-fluid my-2'>
      <div className='card'>
        <div>
          <h3> Lista Tipo Equipo</h3>
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
                  <button className='btn btn-success'><i className="fa-solid fa-user-plus"></i> Agregar Tipo de equipo</button>
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
                tipos.map(tipo => {
                  return <tr key={tipo._id}>
                    <td>{tipo.nombre}</td>
                    <td>{tipo.estado}</td>
                    <td>{moment(tipo.fechaCreacion).format('MMM-DD-yy HH:mm')}</td>
                    <td>{moment(tipo.fechaActualizacion).format('MMM-DD-yy HH:mm')}</td>
                    <td>
                      <Link to={`/tipo-equipo/edit/${tipo._id}`}>
                        <button className='btn btn-primary'><i className="fa-solid fa-user-pen"></i></button></Link>
                    </td>
                    <td>
                      <button className='btn btn-danger' onClick={() => eliminarTipo(tipo._id)}><i className="fa-solid fa-user-xmark"></i></button>
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