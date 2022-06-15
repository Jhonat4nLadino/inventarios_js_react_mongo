import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'; //Hook para obtener los parametros enviados en la url ejemplo /:id
import { getInventarioPorId, editInventario } from '../../services/inventarioService';
import { getEstados } from '../../services/estadoService';
import { getMarcas } from '../../services/marcaService';
import { getTipos } from '../../services/tipoService';
import { getUsuarios } from '../../services/usuarioService';
import Swal from 'sweetalert2';

export const InventarioUpdate = () => {

    const { inventarioId = '' } = useParams();//Se obtiene el id del inventario contenido en la ruta url de componente App
    const [inventario, setInventario] = useState({});

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


    //Si la variable inventarioId obtenida de la url cambia la función debe llamar nuevamente al servicio getInventarioPorId
    useEffect(() => {
        const getInventario = async () => {
            try {
                Swal.fire({
                    allowOutsideClick: false,
                    text: 'Loading...'
                })
                Swal.showLoading();
                const { data } = await getInventarioPorId(inventarioId);
                setInventario(data);
                Swal.close();
            } catch (error) {
                console.log(error);
                Swal.close();
            }
        }
        getInventario();
    }, [inventarioId]);

    //Metodo que trae los valores por defecto del inventario por Id seleccionado del formulario para actualizar
    useEffect(() => {
        setValoresForm({
            nombre: inventario.nombre,
            serial: inventario.serial,
            modelo: inventario.modelo,
            descripcion: inventario.descripcion,
            color: inventario.color,
            foto: inventario.foto,
            fechaCompra: inventario.fechaCompra,
            precio: inventario.precio,
            usuario: inventario.usuario,
            marca: inventario.marca,
            tipoEquipo: inventario.tipoEquipo,
            estadoEquipo: inventario.estadoEquipo,
        });

    }, [inventario])

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
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            })
            Swal.showLoading();
            const { data } = await editInventario(inventarioId, inventario);
            console.log(data);
            Swal.close();
        } catch (error) {
            console.log(error);
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
                    <h5 className='card-title'>Detalle activo</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={inventario?.foto} alt='' />
                        </div>
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
                                                    estados.map(estado => {
                                                        return <option key={estado._id} value={estado._id}>{estado.nombre}</option>
                                                    })
                                                    /*estados.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id}>{nombre}</option>
                                                    })//con destructuracion del objeto estados,*/
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='mb-3'>
                                            <label className='form-label' >Fecha compra</label>
                                            <input type='date' name='fechaCompra' value={fechaCompra} onChange={(e) => handleOnChange(e)} className='form-control' required></input>
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
