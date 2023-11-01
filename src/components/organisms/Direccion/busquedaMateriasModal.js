import React, { useState } from 'react';
import { BotonMUI } from '../../atoms/Button/BotonMUI';
import { Modal, Box, TextField, Grid } from '@mui/material';

const BusquedaMateriasModal = ({
    open,
    onCloseBoton,
    materiasAprobadas,
    universidad
}) => {
    const handleClose = () => {
        onCloseBoton(); // Cierra el modal
    };

    const { data } = materiasAprobadas;

    return (
        <Modal open={open} onClose={onCloseBoton}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 700,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}
            >
                <h4>
                    Materias aprobadas en equivalencias de{' '}
                    {universidad.nombre_universidad}
                </h4>
                <br></br>
                <Grid>Listado de materias</Grid>

                <BotonMUI
                    variant="contained"
                    buttoncontained="+true"
                    disableElevation
                    type="submit"
                    onClick={handleClose}
                >
                    Cerrar
                </BotonMUI>
            </Box>
        </Modal>
    );
};

export default BusquedaMateriasModal;
