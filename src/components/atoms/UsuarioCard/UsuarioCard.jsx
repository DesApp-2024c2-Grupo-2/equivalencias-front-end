import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, Link, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SwitchHabilitarUsuario from "../Button/SwitchHabilitarUsuario";

// Componente para mostrar las tarjetas de equivalencia
const UsuarioCard = ({
    usuario,
    dni,
    email,
    tel,
    rol, 
    estado
}) => {
    //console.log("Estado del usuario:", estado);
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
                    {usuario}
                </Typography>
            </CardContent>
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                {/* Información de la carrera */}
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
                        Email:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                        {email}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Tel:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                        {tel}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Rol:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1, textAlign: 'center' }}>
                        {rol}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '0.5%' }}>
                    <Typography variant="body2" color="black" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        <SwitchHabilitarUsuario 
                        dniUsuario={dni} 
                        estado={estado} // Usa el estado que pasas desde el padre
                    />
                    </Typography>
                    
                </Box>

            </CardContent>
        </Card>
    );
};

export default UsuarioCard;
