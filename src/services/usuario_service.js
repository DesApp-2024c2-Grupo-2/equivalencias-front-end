import axios from 'axios';
import { config } from '../config/config';
import qs from 'qs';

export async function getUsuario(id) {
    const apiResponse = await axios.get(`${config.apiUrl}/usuarios/${id}`);
    return apiResponse.data;
}

export async function getUsuarios() {
    const apiResponse = await axios.get(`${config.apiUrl}/usuarios/todos`);
    return apiResponse.data;
}

export async function getUsuarioEstado(dni) {
    const apiResponse = await axios.get(
        `${config.apiUrl}/usuarios/getEstadoByDni/${dni}`
    );
    return apiResponse.data;
}

export async function getDirectivos() {
    const apiResponse = await axios.get(
        `${config.apiUrl}/usuarios/directivos/todos`
    );
    return apiResponse.data;
}

export async function updateEstadoUsuarioByDni(dni, estadoNuevo) {
    const apiResponse = await axios.put(
        `${config.apiUrl}/usuarios/updateEstadoByDni/${dni}`,
        { estado: estadoNuevo },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return apiResponse;
}

export async function postUsuarios(
    dni,
    nombre,
    apellido,
    email,
    discord,
    telefono,
    rol,
    password,
    estado
) {
    const data = {
        dni: dni,
        nombre: nombre,
        apellido: apellido,
        email: email,
        discord: discord,
        telefono: telefono,
        rol: rol,
        password: password,
        estado: estado
    };
    console.log('DATOS que llegan', data);
    try {
        const apiResponse = await axios.post(
            `${config.apiUrl}/usuarios`,
            qs.stringify(data),
            {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }
        );
        console.log('La respuesta de la api es:', apiResponse);
        console.log('el codigo de funcion es', apiResponse.status);

        return apiResponse;
    } catch (error) {
        console.log(error);
        throw new Error('Error al hacer la petición post');
    }
}
