import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


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
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Año:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                        {añoAprobacion}
                    </Typography>
                </Box>

                {nota && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                        <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Nota:
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                            {nota}
                        </Typography>
                    </Box>
                )}

                {cargaHoraria && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                        <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Carga Horaria:
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                            {cargaHoraria}
                        </Typography>
                    </Box>
                )}

                {certificado && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                        <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Certificado:
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                            {certificado}
                        </Typography>
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Equivalencia:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                        {equivalencia}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Universidad Origen:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                        {universidadOrigen}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default HistorialCard;