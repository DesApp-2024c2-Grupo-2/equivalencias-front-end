import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { getMateriaAprobada } from '../../services/historial_service';
import { getInstitucion } from '../../services/institucionService';
import { getEquivalenciaPorId } from '../../services/equivalencia_service';
import HistorialCard from '../atoms/HistorialCard/HistorialCard';


export default function HistorialTarjetas({ datosHistorial }) {
    const rol = JSON.parse(localStorage.getItem('rol'));
    const [rows, setRows] = useState([]);

    const createData = (
        nota,
        cargaHoraria,
        añoAprobacion,
        nombreMateria,
        certificado,
        equivalencia,
        universidadOrigen
    ) => {
        if (rol === 'directivo' || rol === 'superusuario') {
            return {
                nota,
                cargaHoraria,
                añoAprobacion,
                nombreMateria,
                certificado,
                equivalencia,
                universidadOrigen
            };
        } else {
            return { añoAprobacion, nombreMateria, equivalencia, universidadOrigen };
        }
    };

    useEffect(() => {
        const fetchMateriasAprobadasData = async () => {
            try {
                let obtenerDataMateriasAprobadas = await getMateriaAprobada();
                let array = [];

                for (const arrayItem of obtenerDataMateriasAprobadas) {
                    let d = new Date(arrayItem.año_aprobacion);
                    let dateTime = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
                    let uniOrigen = await getInstitucion(arrayItem.UniversidadOrigenId);
                    let equivalencia = await getEquivalenciaPorId(arrayItem.EquivalenciumId);

                    array.push(
                        createData(
                            arrayItem.nota,
                            arrayItem.carga_horaria,
                            dateTime,
                            arrayItem.nombre_materia,
                            arrayItem.certificado ? 'Sí' : 'No',
                            equivalencia.Materia_aprobadas[0]?.nombre_materia,
                            uniOrigen.nombre_universidad
                        )
                    );
                }
                setRows(array);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchMateriasAprobadasData();
    }, []);

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                overflowX: 'hidden',  // Evita el desplazamiento horizontal
                borderRadius: '10px',
                boxShadow: 'none',
                padding: '20px',
                display: 'flex',
                flexWrap: 'wrap', // Asegura que las cards se ajusten
                gap: '20px', // Espacio entre las cards
                justifyContent: 'center', // Centra las cards
                //background: 'green',
                boxSizing: 'border-box' // Asegura que padding no cause desbordamiento
            }}
        >
            {rows.map((row, index) => (
                <HistorialCard
                    key={index}
                    nombreMateria={row.nombreMateria}
                    añoAprobacion={row.añoAprobacion}
                    nota={rol === 'directivo' || rol === 'superusuario' ? row.nota : null}
                    cargaHoraria={rol === 'directivo' || rol === 'superusuario' ? row.cargaHoraria : null}
                    certificado={rol === 'directivo' || rol === 'superusuario' ? row.certificado : null}
                    equivalencia={row.equivalencia}
                    universidadOrigen={row.universidadOrigen}
                />
            ))}
        </Paper>


    );
}
