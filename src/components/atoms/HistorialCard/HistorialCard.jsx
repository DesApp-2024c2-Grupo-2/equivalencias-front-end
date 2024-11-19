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
                <Box sx={{ display: 'flex', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold' }}>
                        Año:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1 }}>
                        {añoAprobacion}
                    </Typography>
                </Box>
    
            {nota && (
                <Box sx={{ display: 'flex', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold' }}>
                        Nota:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1 }}>
                        {nota}
                    </Typography>
                </Box>
            )}

            {cargaHoraria && (
                <Box sx={{ display: 'flex', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold' }}>
                        Carga Horaria:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1 }}>
                        {cargaHoraria}
                    </Typography>
                </Box>
            )}

            {certificado && (
                <Box sx={{ display: 'flex', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold' }}>
                        Certificado:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1 }}>
                        {certificado}
                    </Typography>
                </Box>
            )}

            <Box sx={{ display: 'flex', paddingTop: '0.5%' }}>
                <Typography variant="body2" color="black" sx={{ fontWeight: 'bold' }}>
                    Equivalencia:
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1 }}>
                    {equivalencia}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', paddingTop: '0.5%' }}>
                <Typography variant="body2" color="black" sx={{ fontWeight: 'bold' }}>
                    Universidad Origen:
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1 }}>
                    {universidadOrigen}
                </Typography>
            </Box>
            </CardContent>
        </Card>
    );
};

export default HistorialCard;