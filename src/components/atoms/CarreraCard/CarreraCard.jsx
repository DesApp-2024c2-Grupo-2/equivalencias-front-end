import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { ModalEditarCarrera, ModalEliminarCarrera } from '../../carreras/Modals';

const CarreraCard = ({
    carrera,
    instituto,
    fechaActualizacion,
    directivo,
    carreraId,
    directivosID,
    seleccionarCarrera,
    openState,
    handleClose,
    handleUpdate,
    handleDelete,
}) => {
    const [carreraSeleccionada, setCarreraSeleccionada] = useState({
        nombre_carrera: carrera || '',
        nombre_instituto: instituto || '',
        id: carreraId || '',
        directivosID: directivosID || [],
    });

    return (
        <Card sx={{ maxWidth: 240, alignItems: 'center', boxShadow: 20 }}>
            <CardContent sx={{ textAlign: 'center', paddingTop: '8%' }}>
                <Typography gutterBottom variant="h6" component="div">
                    {carrera}
                </Typography>
            </CardContent>
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Instituto:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                        {instituto}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Fecha de Actualizacion:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                        {fechaActualizacion}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Directivo:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                        {directivo}
                    </Typography>
                </Box>

                {/* Botones de Editar y Eliminar */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, marginTop: '10px' }}>
                    {/* Botón Editar */}
                    <IconButton
                        onClick={() => seleccionarCarrera(carreraId, 'Editar')}
                        aria-label="edit"
                        sx={{
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        <EditIcon />
                    </IconButton>

                    {/* Modal Editar */}
                    <ModalEditarCarrera
                        openEditar={openState.openEditar}
                        handleCloseEditar={() => handleClose('openEditar')}
                        handleUpdate={handleUpdate}
                        carreraSeleccionada={carreraSeleccionada}
                    />

                    {/* Botón Eliminar */}
                    <IconButton
                        aria-label="delete"
                        onClick={() => seleccionarCarrera(carreraId, 'Eliminar')}
                        sx={{
                            '&:hover': {
                                color: 'error.main',
                            },
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>

                    {/* Modal Eliminar */}
                    <ModalEliminarCarrera
                        openEliminar={openState.openEliminar}
                        handleCloseEliminar={() => handleClose('openEliminar')}
                        handleDelete={handleDelete}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default CarreraCard;