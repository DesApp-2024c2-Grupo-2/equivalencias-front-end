import React from 'react';
import { BotonMUI } from '../../atoms/Button/BotonMUI';
import { Modal, Box, Grid } from '@mui/material';
import TablaResultadosMateria from './TablaResultadosMaterias';

const BusquedaMateriasModal = ({
    open,
    onCloseBoton,
    materiasAprobadas,
    universidad
}) => {
    const handleClose = () => {
        onCloseBoton(); // Cierra el modal
    };

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
                <h4>Materias aprobadas en equivalencias de {universidad}</h4>
                <br></br>
                <Grid>
                    Listado de materias
                    <TablaResultadosMateria
                        materiasAprobadas={materiasAprobadas}
                    />
                </Grid>

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
