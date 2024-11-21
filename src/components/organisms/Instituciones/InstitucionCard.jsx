import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const InstitucionCard = ({ id, nombre, localidad, sigla, estado }) => {
    return (
        <Card
            sx={{
                width: '300px',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Localidad:</strong> {localidad}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Sigla:</strong> {sigla}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Estado:</strong> {estado}
                </Typography>
                <Link to={`/instituciones/editarInstitucion/${id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" fullWidth sx={{ marginTop: '10px' }}>
                        Editar
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};

export default InstitucionCard;
