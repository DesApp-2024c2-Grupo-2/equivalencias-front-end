import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { getInstituciones } from '../../../services/institucionService';
import InstitucionCard from './InstitucionCard';

const LienzoInstitucion = () => {
    const [listaInstituciones, setListaInstituciones] = useState([]);

    useEffect(() => {
        const fetchInstituciones = async () => {
            try {
                const instituciones = await getInstituciones({ limit: 100, page: 1 });
                setListaInstituciones(instituciones.items);
            } catch (error) {
                console.error("Error fetching instituciones:", error);
            }
        };

        fetchInstituciones();
    }, []);

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                borderRadius: '10px',
                padding: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
            }}
        >
            {listaInstituciones.map((institucion) => (
                <InstitucionCard
                    key={institucion.id}
                    id={institucion.id}
                    nombre={institucion.nombre_universidad}
                    localidad={institucion.localidad}
                    sigla={institucion.sigla}
                    estado={institucion.disabled ? "Deshabilitada" : "Habilitada"}
                />
            ))}
        </Paper>
    );
};

export default LienzoInstitucion;