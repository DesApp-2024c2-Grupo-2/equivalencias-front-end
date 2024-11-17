// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

import { getMateriaAprobada } from '../../services/historial_service';
import { getUsuario_carrera } from '../../services/usuarios_carreras_service';

import { ActionButtons } from '../atoms/Button/ActionButtons';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { getInstitucion } from '../../services/institucionService';
import {getMateriaAprobadaPorId} from '../../services/historial_service';
import { getEquivalenciaPorId } from '../../services/equivalencia_service';

export default function TablaHistorial({ datosHistorial }) {
    const rol = JSON.parse(localStorage.getItem('rol'));
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);

    const getColumns = () => {
        if (rol === 'directivo' || rol === 'superusuario') {
            return [
                { id: 'nota', label: 'Nota' },
                { id: 'cargaHoraria', label: 'Carga Horaria' },
                { id: 'añoAprobacion', label: 'Año de Aprobacion' },
                { id: 'nombreMateria', label: 'Nombre Materia' },
                { id: 'certificado', label: 'Certificado' },
                { id: 'equivalencia', label: 'Equivalencia' },
                { id: 'universidadOrigen', label: 'Universidad de Origen' }
            ];
        } else {
            return [
                { id: 'añoAprobacion', label: 'Año de Aprobacion', minWidth: 170 },
                { id: 'nombreMateria', label: 'Nombre Materia', minWidth: 170 },
                { id: 'equivalencia', label: 'Equivalencia', minWidth: 170 },
                { id: 'universidadOrigen', label: 'Universidad de Origen', minWidth: 170 }
            ];
        }
    };
    const columns = getColumns();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filterNameMat = (materias) => {
        let stringSalida = '';
        let cant = materias.length;
        if (cant === 1) {
            stringSalida = materias[0].nombre;
        } else if (cant === 2) {
            stringSalida = materias[0].nombre + ', ' + materias[1].nombre;
        } else {
            stringSalida = `Cantidad de materias: ${cant}`;
        }
        return stringSalida;
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

                // Establece las filas luego de cargar todos los datos
                setRows(array);
                setPage(0); // Resetea la página a la primera
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchMateriasAprobadasData();
    }, []); 

    useEffect(() => {
        if (searchQuery) {
            let dataFilter = [...rows];
            switch (searchQuery.column) {
                case 'nombreMateria':
                    dataFilter = rows.filter((d) =>
                        d.nombreMateria.toLowerCase().includes(searchQuery.value.toLowerCase())
                    );
                    break;
                case 'añoAprobacion':
                    dataFilter = rows.filter((d) =>
                        d.añoAprobacion.toString().includes(searchQuery.value)
                    );
                    break;
                case 'carrera':
                    dataFilter = rows.filter((d) =>
                        d.carreraOrigen?.toLowerCase().includes(searchQuery.value.toLowerCase())
                    );
                    break;
                default:
                    dataFilter = rows;
                    break;
            }
            setRows(dataFilter); // Actualiza las filas filtradas
        }
    }, [searchQuery, rows]);
//console.log(columns)
//console.log("hoal")
console.log(rows)


    return(
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                borderRadius: '10px',
                boxShadow: 'none'
            }}
        >
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={'center'}
                                    style={{ minWidth: column.minWidth }}
                                    sx={{
                                        backgroundColor: 'rgba(245, 245, 245)',
                                        padding: '16px 40px'
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align="center"
                                                    sx={{
                                                        padding: '1rem 2rem'
                                                    }}
                                                >
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                labelRowsPerPage="Filas por página:"
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count}`
                }
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}