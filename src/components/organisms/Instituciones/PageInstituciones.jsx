import React from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import { Header } from '../../molecules/Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import LienzoInstitucion from './LienzoInstitucion';

const PageInstituciones = () => {
    return (
        <Grid container direction="column">
            <Grid item container xs={12}>
                <Header name="Instituciones" paginaPrincipal="/" />
            </Grid>

            <Grid container spacing={1} xs={12}>
                <Grid item sx={{ padding: '2rem 0' }}>
                    <Link to="/direccion/instituciones">
                        <IconButton sx={{ padding: 0 }}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                </Grid>

                <Grid item sx={{ padding: '2rem' }}>
                    <Typography variant="h3" component="h1">
                        Instituciones registradas
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <LienzoInstitucion />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PageInstituciones;