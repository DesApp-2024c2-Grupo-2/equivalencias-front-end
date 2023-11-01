import axios from 'axios';
import { config } from '../config/config';

export async function getMateriaAprobadasPorUniversidad(id) {
    const apiResponse = await axios.get(
        `${config.apiUrl}/materias_aprobadas/universidad/${id}`
    );
    return apiResponse.data;
}
