import { React } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { Header } from '../../molecules/Header';
import { ContainerTitle } from './DireccionStyled';
import DashboardCard from '../../atoms/DashboardCard/DashboardInstitucionCard';

const DireccionDashboard = () => {
    const rol = JSON.parse(localStorage.getItem('rol'));
    const rolDireccion =
        rol === 'directivo'
            ? '/direccion/solicitudes'
            : '/superusuario/solicitudes';

    return (
        <>
            <Grid item container xs={12}>
                <Header name="Instituciones" paginaPrincipal="/" />
            </Grid>
            <Container sx={{ padding: '2rem' }}>
                <Grid container spacing={2} xs={12}>
                    <ContainerTitle>
                        <Typography variant="h3" component="h1">
                            Menú de Dirección
                        </Typography>
                    </ContainerTitle>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            spacing={2}
                            xs={12}
                            sx={{ flexDirection: 'row', display: 'flex' }}
                        >
                            <Grid sx={{ padding: '0.5rem' }}>
                                <DashboardCard
                                    tituloCard="Solicitudes"
                                    cuerpoCard="Gestion y comunicación"
                                    imgSrc="https://res.cloudinary.com/dfwvsjwjr/image/upload/c_scale,w_68/v1684362644/solicitud_rryiab.png"
                                    link={rolDireccion}
                                />
                            </Grid>
                            <Grid sx={{ padding: '0.5rem' }}>
                                <div
                                    style={{
                                        display:
                                            rol == 'directivo' ? 'none' : 'true'
                                    }}
                                >
                                    <DashboardCard
                                        tituloCard="Usuarios"
                                        cuerpoCard="Administrar y habilitar"
                                        imgSrc="https://drive.google.com/uc?export=view&id=1sRHDyv6r5z6A6t874d9HP3lzPW1aOcGy"
                                        link={'/superusuario/usuarios'}
                                    />
                                </div>
                            </Grid>
                            <Grid sx={{ padding: '0.5rem' }}>
                                <div
                                    style={{
                                        display:
                                            rol == 'directivo' ? 'none' : 'true'
                                    }}
                                >
                                    <DashboardCard
                                        tituloCard="Carreras"
                                        cuerpoCard="Ingreso y modificación"
                                        imgSrc="https://drive.google.com/uc?export=view&id=1c1CdqCcDO5CDlkfr0mawwmTBRDElgRbK"
                                        link={'/superusuario/carreras'}
                                    />
                                </div>
                            </Grid>

                            <Grid sx={{ padding: '0.5rem' }}>
                                <DashboardCard
                                    tituloCard="Instituciones"
                                    cuerpoCard="Administrar y ingresar"
                                    imgSrc="https://res.cloudinary.com/dfwvsjwjr/image/upload/c_scale,w_68/v1684362643/institucion_1_plx7hx.png"
                                    link={'/direccion/instituciones'}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
export default DireccionDashboard;
