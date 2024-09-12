import axios from 'axios';
import { config } from '../config/config';

export async function getEquivalencia() {
    const apiResponse = await axios.get(
        `${config.apiUrl}/equivalencias/general`
    );
    return apiResponse.data;
}

export async function getEquivalenciaPorDirectivo(id) {
    const apiResponse = await axios.get(
        `${config.apiUrl}/usuarios_carreras/directivo/${id}`
    );
    return apiResponse.data;
}

// export async function getEquivalenciaPorDirectivo() {
//     const apiResponse = await axios.get(
//         `${config.apiUrl}/equivalencias/general/`
//     );
//     return apiResponse.data;
// }

export async function getEquivalenciaSuperUsuario() {
    const apiResponse = await axios.get(
        `${config.apiUrl}/usuarios_carreras/superusuario`
    );
    return apiResponse.data;
}

export async function getEquivalenciaUsuario(id) {
/*     const apiResponse = await axios.get(
        `${config.apiUrl}/equivalencias/generalUsuario/${id}`
    );
    return apiResponse.data; */
    try {
        const apiResponse = await axios.get(
            `${config.apiUrl}/equivalencias/generalUsuario/${id}`
        );
        return apiResponse.data;
    } catch (error) {
        switch (error.response.status){
            case 404:
                alert("No hay equivalencias")
        }
    }
}

export async function putEquivalenciaUsuario(id, solicitante) {
    const apiResponse = await axios.put(
        `${config.apiUrl}/equivalencias/${(id, solicitante)}`
    );
    return apiResponse.data;
}
