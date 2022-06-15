import React, { useState, useEffect } from 'react'
import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTipos } from '../../services/tipoService';
import { getEstados } from '../../services/estadoService';
import { createInventario } from '../../services/inventarioService';
import Swal from 'sweetalert2';

export const InventarioNew = ({ handleModal, listarInventarios }) => {

    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [estados, setEstados] = useState([]);

    const [valoresForm, setValoresForm] = useState({});
    const { nombre = '', serial = '', modelo = '', descripcion = '', color = '',
        foto = '', fechaCompra = '', precio = '', usuario = '', marca = '',
        tipoEquipo = '', estadoEquipo = '' } = valoresForm;

    useEffect(() => {
        const listarUsuarios = async () => {
            try {
                const { data } = await getUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.log(error);
            }
        }
        listarUsuarios();
    }, []);

    useEffect(() => {
        const listarMarcas = async () => {
            try {
                const { data } = await getMarcas();
                setMarcas(data);
            } catch (error) {
                console.log(error);
            }
        }
        listarMarcas();
    }, []);

    useEffect(() => {
        const listarTipos = async () => {
            try {
                const { data } = await getTipos();
                setTipos(data);
            } catch (error) {
                console.log(error);
            }
        }
        listarTipos();
    }, []);

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

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const inventario = {
            nombre: nombre,
            serial: serial,
            modelo: modelo,
            descripcion: descripcion,
            color: color,
            foto: foto,
            fechaCompra: fechaCompra,
            precio: precio,
            usuario: {
                _id: usuario
            },
            marca: {
                _id: marca
            },
            tipoEquipo: {
                _id: tipoEquipo
            },
            estadoEquipo: {
                _id: estadoEquipo
            },
        }
        console.log(inventario);
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            })
            Swal.showLoading();
            const { data } = await createInventario(inventario);
            console.log(data);
            Swal.close();
            handleModal();
            listarInventarios();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    return (
        <div className='sidebar'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Nuevo inventaro</h3>
                            <i className='fa-solid fa-xmark' onClick={handleModal}></i>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <hr />
                    </div>
                </div>
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
                                <label className='form-label' >Serial</label>
                                <input name='serial' value={serial} onChange={(e) => handleOnChange(e)} className='form-control' type='text' required></input>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='mb-3'>
                                <label className='form-label' >Modelo</label>
                                <input name='modelo' value={modelo} onChange={(e) => handleOnChange(e)} className='form-control' type='text' required></input>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='mb-3'>
                                <label className='form-label' >Descripción</label>
                                <input name='descripcion' value={descripcion} onChange={(e) => handleOnChange(e)} className='form-control' type='text' required></input>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='mb-3'>
                                <label className='form-label' >Color</label>
                                <input name='color' value={color} onChange={(e) => handleOnChange(e)} className='form-control' type='text' required></input>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='mb-3'>
                                <label className='form-label' >Foto</label>
                                <input name='foto' value={foto} onChange={(e) => handleOnChange(e)} className='form-control' type='url' required></input>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='mb-3'>
                                <label className='form-label' >Precio</label>
                                <input name='precio' value={precio} onChange={(e) => handleOnChange(e)} className='form-control' type='number' required></input>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='mb-3'>
                                <label className='form-label' >Usuario</label>
                                <select className="form-select" name='usuario' value={usuario} onChange={(e) => handleOnChange(e)} required>
                                    <option value=''>...</option>
                                    {
                                        usuarios.map(usuario => {
                                            return <option key={usuario._id} value={usuario._id}>{usuario.nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='mb-3'>
                                <label className='form-label' >Marca</label>
                                <select className="form-select" name='marca' value={marca} onChange={(e) => handleOnChange(e)} required>
                                    <option value=''>...</option>
                                    {
                                        marcas.map(marca => {
                                            return <option key={marca._id} value={marca._id}>{marca.nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='mb-3'>
                                <label className='form-label' >Tipo equipo</label>
                                <select className="form-select" name='tipoEquipo' value={tipoEquipo} onChange={(e) => handleOnChange(e)} required>
                                    <option value=''>...</option>
                                    {
                                        tipos.map(tipo => {
                                            return <option key={tipo._id} value={tipo._id}>{tipo.nombre}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='mb-3'>
                                <label className='form-label' >Estado equipo</label>
                                <select className="form-select" name='estadoEquipo' value={estadoEquipo} onChange={(e) => handleOnChange(e)} required>
                                    <option value=''>...</option>
                                    {
                                        estados.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        })//destructuracion del objeto estados,
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='mb-3'>
                                <label className='form-label' >Fecha compra</label>
                                <input name='fechaCompra' value={fechaCompra} onChange={(e) => handleOnChange(e)} className='form-control' type='date' required></input>
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-primary'>Crear</button>
                </form>
            </div>
        </div>
    )
}
