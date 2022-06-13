import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getInventarioPorId } from '../../services/inventarioService';

export const InventarioUpdate = () => {

    const { inventarioId = '' } = useParams;

    const getInventario = async () => {
        try {
            const { data } = await getInventarioPorId(inventarioId);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInventario();
    }, [inventarioId]);


    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle activo</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-3'>

                        </div>
                        <div className='col-md-9'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
