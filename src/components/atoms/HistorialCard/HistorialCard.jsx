import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const HistorialCard = ({ nombreMateria, añoAprobacion, nota, cargaHoraria, certificado, equivalencia, universidadOrigen }) => {
    return (
        <Card
            sx={{
                maxWidth: 240,
                alignItems: 'center',
                boxShadow: 20
            }}
        >
            <CardContent sx={{ textAlign: 'center', paddingTop: '8%' }}>
                <Typography gutterBottom variant="h6" component="div">
                    {nombreMateria}
                </Typography>
            </CardContent>
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ paddingTop: '0.5%' }}>
                    Año: {añoAprobacion}
                </Typography>
                {nota && (
                    <Typography variant="body2" color="text.secondary">
                        Nota: {nota}
                    </Typography>
                )}
                {cargaHoraria && (
                    <Typography variant="body2" color="text.secondary">
                        Carga Horaria: {cargaHoraria}
                    </Typography>
                )}
                {certificado && (
                    <Typography variant="body2" color="text.secondary">
                        Certificado: {certificado}
                    </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                    Equivalencia: {equivalencia}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Universidad: {universidadOrigen}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default HistorialCard;