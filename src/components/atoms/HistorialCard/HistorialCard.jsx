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
                <Typography variant="body2" color="black" sx={{ paddingTop: '0.5%', fontWeight: 'bold', display: 'inline' }}>
                    Año: <Typography variant="body2" color="text.secondary" sx={{ paddingTop: '0.5%', display: 'inline'}}>{añoAprobacion}</Typography>
                </Typography>
                {nota && (
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', display: 'inline' }}>
                        Nota: <Typography variant="body2" color="text.secondary" sx={{ paddingTop: '0.5%', display: 'inline'}}>{nota}</Typography>
                    </Typography>
                )}
                {cargaHoraria && (
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', display: 'inline' }}>
                        Carga Horaria: <Typography variant="body2" color="text.secondary" sx={{ paddingTop: '0.5%', display: 'inline'}}>{cargaHoraria}</Typography>
                    </Typography>
                )}
                {certificado && (
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', display: 'inline' }}>
                        Certificado: <Typography variant="body2" color="text.secondary" sx={{ paddingTop: '0.5%', display: 'inline'}}>{certificado}</Typography>
                    </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', display: 'inline' }}>
                    Equivalencia: <Typography variant="body2" color="text.secondary" sx={{ paddingTop: '0.5%', display: 'inline'}}>{equivalencia}</Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', display: 'inline' }}>
                    Universidad Origen: <Typography variant="body2" color="text.secondary" sx={{ paddingTop: '0.5%', display: 'inline'}}>{universidadOrigen}</Typography>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default HistorialCard;