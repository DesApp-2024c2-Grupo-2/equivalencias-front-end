import { Grid, IconButton } from '@mui/material';
import { Header } from './Header';
import { GridTop } from '../atoms/GridTop';
import { Titulos } from '../atoms/Title/Titulos';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import TablaHistorial from './TablaHistorial';
import { ToastContainer } from 'react-toastify';



const PageHistorial = () => {
    return (
        <Grid container direction="column">
            <Grid item container xs={12}>
                <Header
                    name="Mis equivalencias"
                    paginaPrincipal="/usuario/equivalencias/"
                />
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
                    container
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
                        <Link to="/usuario/equivalencias">
                            <IconButton sx={{ padding: 0 }}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                        <Titulos component="h2" titulogrande="+true">
                            Historial
                        </Titulos>
                    </Grid>
                </GridTop>
                <GridTop
                        item
                        container
                        blanco
                        xs={11.5}
                        md={9}
                        lg={7}
                        marginTop={{
                            xs: '0px',
                            sm: '30px'
                        }}
                        sx={{
                            height: 'auto'
                        }}
                    >
                        <TablaHistorial />
                        {/* <StickyHeadTable /> */}
                    </GridTop>
            <ToastContainer
                containerId={'home'}
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Grid>
        </Grid>
            
    );
};

export { PageHistorial };
