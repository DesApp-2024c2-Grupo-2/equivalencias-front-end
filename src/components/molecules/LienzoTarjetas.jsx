import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
//import Table from '@mui/material/Table';
//import TableBody from '@mui/material/TableBody';
//import TableCell from '@mui/material/TableCell';
//import TableContainer from '@mui/material/TableContainer';
//import TableHead from '@mui/material/TableHead';
//import TablePagination from '@mui/material/TablePagination';
//import TableRow from '@mui/material/TableRow';
//import Button from '@mui/material/Button';
//import { Link } from 'react-router-dom';
//import { Grid } from '@mui/material';

import { getMateriaAprobada } from '../../services/historial_service';
import { getUsuario_carrera } from '../../services/usuarios_carreras_service';

//import { ActionButtons } from '../atoms/Button/ActionButtons';
//import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { getInstitucion } from '../../services/institucionService';
//import {getMateriaAprobadaPorId} from '../../services/historial_service';
import { getEquivalenciaPorId } from '../../services/equivalencia_service';

import HistorialCard from '../atoms/HistorialCard/HistorialCard';

/*export default function LienzoTarjetas({ datosHistorial }) {
    const rol = JSON.parse(localStorage.getItem('rol'));
    //const [page, setPage] = React.useState(0);
    //const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([]);
    //const [searchQuery, setSearchQuery] = useState(null);

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
        const fetchCarrerasData = async () => {
            if (rol === 'directivo') {
                const carreras = await getUsuario_carrera(JSON.parse(localStorage.getItem('id')));
                return carreras;
            }
            return [];
        };

        const fetchMateriasAprobadasData = async () => {
            try {
                    // Obtén los datos de las materias aprobadas
                    let obtenerDataMateriasAprobadas = await getMateriaAprobada();
                    let array = [];

                    // Recorre los datos obtenidos utilizando for...of
                    for (const arrayItem of obtenerDataMateriasAprobadas) {
                        let d = new Date(arrayItem.año_aprobacion);
                        let dateTime = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

                        // Usa await para esperar que las funciones asincrónicas terminen
                        let uniOrigen = await getInstitucion(arrayItem.UniversidadOrigenId);
                        let equivalencia = await getEquivalenciaPorId(arrayItem.EquivalenciumId)
                        console.log("certificado",arrayItem.certificado);
                        // Crea y agrega los datos al array 
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
                setPage(0); // Resetea la página a la primera
            } catch (error) {
                console.error("Error fetching data:", error);
            }}
        fetchMateriasAprobadasData();
    }, []);


    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                borderRadius: '10px',
                boxShadow: 'none',
                padding: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'
            }}
        >
            {rows.map((row, index) => (
                <Card
                    key={index}
                    sx={{
                        maxWidth: 240,
                        boxShadow: 20,
                        textAlign: 'center',
                        margin: '10px',
                        padding: '20px'
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" component="div" gutterBottom>
                            {row.nombreMateria}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Año de Aprobación: {row.añoAprobacion}
                        </Typography>
                        {rol === 'directivo' || rol === 'superusuario' ? (
                            <>
                                <Typography variant="body2" color="text.secondary">
                                    Nota: {row.nota}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Carga Horaria: {row.cargaHoraria}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Certificado: {row.certificado}
                                </Typography>
                            </>
                        ) : null}
                        <Typography variant="body2" color="text.secondary">
                            Equivalencia: {row.equivalencia}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Universidad de Origen: {row.universidadOrigen}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Paper>
    );
}*/

/*import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import HistorialCard from '../atoms/HistorialCard/HistorialCard';*/

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
                borderRadius: '10px',
                boxShadow: 'none',
                padding: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'
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
