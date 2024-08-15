import React, { useState } from 'react';
import { BotonMUI } from '../../atoms/Button/BotonMUI';
import { Modal, Box, TextField } from '@mui/material';
import { postReset } from '../../../services/reset_services';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const ResetPasswordModal = ({ open, onClose }) => {
    const [dni, setDni] = useState('');

    const handleResetPassword = () => {
        console.log(`Solicitando reset de contraseña para DNI: ${dni}`);
        if (dni != '' && Number(dni)) {
            postReset(dni);
            notifyExito('Reset enviado. Consulte en su correo electronico');
        } else {
            notifyError('ERROR: ingresar un DNI para solicitar Reset');
        }
        onClose();
    };

    const notifyExito = (mensaje) => {
        toast.success(mensaje, {
            containerId: 'home',
            position: 'bottom-left',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    const notifyError = (mensaje) => {
        toast.error(mensaje, {
            position: 'bottom-left',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
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
