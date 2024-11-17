import axios from 'axios';
import { config } from '../config/config';

export async function getMateriaAprobada() {
    const apiResponse = await axios.get(
        `${config.apiUrl}/materias_aprobadas`
    );
    //console.log("apiResponse: ",apiResponse )
    return apiResponse.data.data;
}

export async function getMateriaAprobadaPorId(id) {
    const apiResponse = await axios.get(
        `${config.apiUrl}/materias_aprobadas/${id}`
    );

    console.log("apiResponse: ",apiResponse )
    return apiResponse.nombre_materia;
}