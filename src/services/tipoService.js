import { axiosInstance } from '../helpers/axios-config';

const getTipos = () => {
    return axiosInstance.get('tipo-equipo', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getTipoPorId = (tipoId) => {
    return axiosInstance.get(`tipo-equipo/${tipoId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const createTipo = (data) => {
    return axiosInstance.post('tipo-equipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const editTipo = (TipoEquipoId, data) => {
    return axiosInstance.put(`tipo-equipo/${TipoEquipoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const deleteTipo = (tipoId) => {
    return axiosInstance.delete(`tipo-equipo/${tipoId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getTipos,
    getTipoPorId,
    createTipo,
    editTipo,
    deleteTipo
}