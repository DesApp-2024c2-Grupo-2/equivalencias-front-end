import React from 'react';
import { FormularioInicioSesion } from '../../molecules/FormularioInicioSesion';
import { Register } from '../../molecules/SideRegistro';
import { TarjetaLogin, FatherContainer } from './IniciarSesionStyled';
import { Grid } from '@mui/material';
const PageIniciarSesion = () => {
    return (
        <FatherContainer>
            <TarjetaLogin>
                <Grid container >
                    <Grid item xs={12} sm={5}>
                        <Register />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <FormularioInicioSesion />
                    </Grid>
                </Grid>
            </TarjetaLogin>
        </FatherContainer>
    );
};

export default PageIniciarSesion;
