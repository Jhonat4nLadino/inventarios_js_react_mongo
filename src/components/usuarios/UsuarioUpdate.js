import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'; //Hook para obtener los parametros enviados en la url ejemplo /:id
import { getEstados } from '../../services/estadoService';
import { getUsuarioPorId, editUsuario } from '../../services/usuarioService';
import Swal from 'sweetalert2';

//Falta que al actualizar se regrese de nuevo a la lista de usuarios /usuarios

export const UsuarioUpdate = () => {

    const { usuarioId = '' } = useParams();//Se obtiene el id del inventario contenido en la ruta url de componente App

    const [usuarios, setUsuarios] = useState([]);
    const [estados, setEstados] = useState([]);

    const [valoresForm, setValoresForm] = useState({});
    const { nombre = '', email = '', estadoEquipo = '' } = valoresForm;

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


    //Si la variable inventarioId obtenida de la url cambia la función debe llamar nuevamente al servicio getInventarioPorId
    useEffect(() => {
        const getUsuario = async () => {
            try {
                Swal.fire({
                    allowOutsideClick: false,
                    text: 'Loading user...'
                })
                Swal.showLoading();
                const { data } = await getUsuarioPorId(usuarioId);
                setUsuarios(data);
                Swal.close();
            } catch (error) {
                console.log(error);
                Swal.close();
            }
        }
        getUsuario();
    }, [usuarioId]);

    //Metodo que trae los valores por defecto del inventario por Id seleccionado del formulario para actualizar
    useEffect(() => {
        setValoresForm({
            nombre: usuarios.nombre,
            email: usuarios.email,
            estado: usuarios.estadoEquipo,
        });

    }, [usuarios])

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const usuario = {
            nombre: nombre,
            email: email,
            estado: estadoEquipo,
        }
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Actualizando usuario...'
            })
            Swal.showLoading();
            const { data } = await editUsuario(usuarioId, usuario);
            console.log(data);
            Swal.close();
        } catch (error) {
            Swal.close();
            let mensaje;
            if (error && error.response && error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = 'Ocurrio un error, intente de nuevo';//Mensaje de error desde el front
            }
            Swal.fire('Error', mensaje, 'error');//Error desde el backend
        }
    }

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle usuario</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-8'>
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
                                            <label className='form-label' >Email</label>
                                            <input name='email' value={email} onChange={(e) => handleOnChange(e)} className='form-control' type='text' required></input>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='mb-3'>
                                            <label className='form-label' >Estado equipo</label>
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
                                <button className='btn btn-primary'>Actualizar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
