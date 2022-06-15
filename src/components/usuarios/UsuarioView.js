import React, { useState, useEffect } from 'react'
import { createUsuario, getUsuarios, deleteUsuario } from '../../services/usuarioService';
import { getEstados } from '../../services/estadoService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';


export const UsuarioView = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [estados, setEstados] = useState([]);

    //2. Se declara los valores de formulario que contiene la información de los input/select y de forma vacia
    const [valoresForm, setValoresForm] = useState({});
    //3. Se desestructura la variable valoresForm en las variables de los valores del formulario
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

    //Llamado al endpoint de forma asincrona y llamo a getUsuarios que contiene la logica de listar los usuarios contenido en data del obj.

    const listarUsuarios = async () => {
        try {
            const { data } = await getUsuarios();
            setUsuarios(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarUsuarios();
    }, []);


    const eliminarUsuario = (usuarioId) => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Eliminando usuario...'
            })
            Swal.showLoading();
            deleteUsuario(usuarioId)
            Swal.close();
            listarUsuarios();/* NO ME LISTA DE NUEVO A LOS USUARIO DESPUÉS DE ELIMINAR */
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    //4. Se obtiene los cambios del input/select a través de setValoresForm
    //A. El operador spred guarda los valores actuales y a través de las poriedades target [name] y value se obtiene los datos del input/select
    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    //6.
    //A. e.preventDefault() evita que se recargue la página al presionar el boton del formulario.
    //B. Se envia el objeto obtenido del formulario a los metodos declarados del servicio 
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const usuario = {
            nombre: nombre,
            email: email,
            estado: estadoEquipo
        }
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Creando usuario...'
            })
            Swal.showLoading();
            const { data } = await createUsuario(usuario);
            console.log(data);
            Swal.close();
            setValoresForm({ nombre: '', email: '', estadoEquipo: '' });
            listarUsuarios();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    //1. Se procede con la creación del formulario para escribir los datos necesarios de llenar el formulario
    //A. value { nombre} = nombre con el que se obtiene el valor del input/select del formulario y se setea en valoresForm
    //B. onChange = evento de formulario que detecta el cambio y recibe las propiedades (e) del formulario ya sea input/select
    //C. name '' = nombre unico para el fomrulario y saber de donde recuperar los valores
    //5. Se activa el evento onSubmit del formulario para setear los datos
    return (
        <div className='container-fluid my-2'>
            <div className='card'>
                <div>
                    <h3> Lista Usuarios</h3>
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
                                            <label className='form-label' >Email</label>
                                            <input name='email' value={email} onChange={(e) => handleOnChange(e)} className='form-control' type='email' required></input>
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
                                    <button className='btn btn-success'><i className="fa-solid fa-user-plus"></i> Agregar persona</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Email</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Fecha creación</th>
                                <th scope="col">Fecha actualización</th>
                                <th scope="col">Editar</th>
                                <th scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usuarios.map(usuario => {
                                    return <tr key={usuario._id}>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.estado}</td>
                                        <td>{moment(usuario.fechaCreacion).format('MMM-DD-yy HH:mm')}</td>
                                        <td>{moment(usuario.fechaActualizacion).format('MMM-DD-yy HH:mm')}</td>
                                        <td>
                                            <Link to={`/usuario/edit/${usuario._id}`}>
                                                <button className='btn btn-primary'><i className="fa-solid fa-user-pen"></i></button></Link>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => eliminarUsuario(usuario._id)}><i className="fa-solid fa-user-xmark"></i></button>
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
