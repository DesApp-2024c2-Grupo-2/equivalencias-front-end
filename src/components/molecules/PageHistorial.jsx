import { useState, useEffect } from 'react';
import { Grid, IconButton } from '@mui/material';
import { Header } from './Header';
import { GridTop } from '../atoms/GridTop';
import { Titulos } from '../atoms/Title/Titulos';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import TablaHistorial from './TablaHistorial';
import { ToastContainer } from 'react-toastify';
import { getMateriaAprobada } from '../../services/historial_service';
import HistorialCard from '../atoms/HistorialCard/HistorialCard';
import LienzoTarjetas from './LienzoTarjetas';

const PageHistorial = () => {
    const rol = JSON.parse(localStorage.getItem('rol'));
    const [datosHistorial, setDatosHistorial] = useState([]);

    useEffect(() => {
        const fetchDatosHistorial = async () => {
            try {
                const datos = await getMateriaAprobada();
                setDatosHistorial(datos);
            } catch (error) {
                console.error("Error al obtener los datos del historial:", error);
            }
        };

        fetchDatosHistorial();
    }, []);

    return (
        <>
        <Grid container direction="column">
            <Grid item xs={12}>
                <Header
                    name="Mis equivalencias"
                    paginaPrincipal="/usuario/equivalencias/" />
            </Grid>

            <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ padding: '40px 0px' }}
            >
                <GridTop
                    item
                    xs={11.5}
                    md={7}
                    sx={{
                        padding: '0px 20px'
                    }}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Link
                            to={rol === 'alumno'
                                ? "/usuario/equivalencias"
                                : rol === 'directivo'
                                    ? "/direccion/solicitudes"
                                    : rol === 'superusuario' && "/direccionDashboard"}
                        >
                            <IconButton sx={{ padding: 0 }}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                        <Titulos component="h2" titulogrande={true}>
                            Base Equivalencias
                        </Titulos>
                    </Grid>
                </GridTop>
            </Grid>
        </Grid>
        
        <LienzoTarjetas />
        </>
    );
};

export { PageHistorial };
