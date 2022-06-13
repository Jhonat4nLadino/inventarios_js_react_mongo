import { axiosInstance } from '../helpers/axios-config';

const getEstados = () =>{
    return axiosInstance.get('estado-equipo', {
        headers:{
            'Content-type':'application/json'
        }
    });
}

const createEstado = (data) =>{
    return axiosInstance.post('estado-equipo', data, {
        headers:{
            'Content-type':'application/json'
        }
    });
}

const editEstado = (estadoEquipoId, data) =>{
    return axiosInstance.put(`estado-equipo/${estadoEquipoId}`, data, {
        headers:{
            'Content-type':'application/json'
        }
    });
}

export{
    getEstados,
    createEstado,
    editEstado
}