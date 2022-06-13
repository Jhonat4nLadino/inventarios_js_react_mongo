import { axiosInstance } from '../helpers/axios-config';

const getTipos = () => {
    return axiosInstance.get('tipo-equipo', {
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

export {
    getTipos,
    createTipo,
    editTipo
}