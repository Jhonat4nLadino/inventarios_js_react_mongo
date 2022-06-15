import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getEstados } from '../../services/estadoService';
import { editMarca, getMarcaPorId } from "../../services/marcaService";
import Swal from 'sweetalert2';


export const MarcaUpdate = () => {

    const { marcaId = '' } = useParams();

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


    useEffect(() => {
        const getMarca = async () => {
            try {
                Swal.fire({
                    allowOutsideClick: false,
                    text: 'Loading user...'
                })
                Swal.showLoading();
                const { data } = await getMarcaPorId(marcaId);
                setMarcas(data);
                Swal.close();
            } catch (error) {
                console.log(error);
                Swal.close();
            }
        }
        getMarca();
    }, [marcaId]);


    useEffect(() => {
        setValoresForm({
            nombre: marcas.nombre,
            email: marcas.email,
            estado: marcas.estadoEquipo,
        });

    }, [marcas])

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const marca = {
            nombre: nombre,
            estado: estadoEquipo,
        }
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Actualizando marca...'
            })
            Swal.showLoading();
            const { data } = await editMarca(marcaId, marca);
            console.log(data);
            Swal.close();
        } catch (error) {
            Swal.close();
            let mensaje;
            if (error && error.response && error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = 'Ocurrio un error, intente de nuevo';
            }
            Swal.fire('Error', mensaje, 'error');
        }
    }

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle marca</h5>
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
