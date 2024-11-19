import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, Link, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Componente para mostrar las tarjetas de equivalencia
const EquivalenciaCard = ({
    materiaSolicitada,
    carrera,
    fecha,
    estado,  // Estado ya renderizado desde LienzoTarjetasEquivalencia
    linkVisualizar,
    dni, // Campo adicional para DNI
    solicitante // Campo adicional para solicitante
}) => {
    // Recuperamos el rol del localStorage
    const rol = JSON.parse(localStorage.getItem('rol'));

    return (
        <Card
            sx={{
                maxWidth: 240,
                alignItems: 'center',
                boxShadow: 20,
            }}
        >
            <CardContent sx={{ textAlign: 'center', paddingTop: '8%' }}>
                <Typography gutterBottom variant="h6" component="div">
                    {materiaSolicitada}
                </Typography>
            </CardContent>
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                {/* Información de la carrera */}
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Carrera:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                        {carrera}
                    </Typography>
                </Box>

                {/* Información de la fecha */}
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Fecha:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                        {fecha}
                    </Typography>
                </Box>

                {/* Mostrar información adicional solo para roles específicos */}
                {rol === 'directivo' || rol === 'superusuario' ? (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                            <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                DNI:
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                                {dni}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                            <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                Solicitante:
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                                {solicitante}
                            </Typography>
                        </Box>
                    </>
                ) : null}

                {/* Estado de la solicitud ya renderizado */}
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                    {estado} {/* El estado ya viene renderizado desde LienzoTarjetasEquivalencia */}
                </Box>

                {/* Link para visualizar si se aplica */}
                {linkVisualizar && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                        <Link href={linkVisualizar} target="_blank" underline="hover">
                            <IconButton color="primary">
                                <VisibilityIcon />
                            </IconButton>
                        </Link>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default EquivalenciaCard;
