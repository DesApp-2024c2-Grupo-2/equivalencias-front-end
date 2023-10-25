import React, { useState } from 'react';
import { BotonMUI } from '../../atoms/Button/BotonMUI';
import { Modal, Box, TextField } from '@mui/material';
import { postReset } from '../../../services/reset_services';

const ResetPasswordModal = ({ open, onClose }) => {
    const [dni, setDni] = useState('');

    const handleResetPassword = () => {
        // lógica para enviar el DNI al backend y solicitar el reset de contraseña
        console.log(`Solicitando reset de contraseña para DNI: ${dni}`);
        postReset(dni);
        onClose(); // Cierra el modal después de enviar la solicitud
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}
            >
                <h4>Pedido de reset de Contraseña</h4>
                <br></br>
                <TextField
                    label="DNI"
                    variant="outlined"
                    fullWidth
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <BotonMUI
                    variant="contained"
                    buttoncontained="+true"
                    disableElevation
                    type="submit"
                    onClick={handleResetPassword}
                >
                    Solicitar
                </BotonMUI>
            </Box>
        </Modal>
    );
};

export default ResetPasswordModal;
