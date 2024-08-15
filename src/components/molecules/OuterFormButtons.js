import React, { useState } from 'react';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularColor from '../atoms/Button/CargaCircular';

const OuterFormButtons = ({ handleSubmit, path, titulo, mensaje }) => {
    const [open, setOpen] = useState(false);
    const [finalizar, setFinalizar] = useState('Finalizar');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFinalizar = () => {
        setFinalizar(<CircularColor />);
    };

    return (
        <>
            <BotonMUI
                buttoncontainedsmall="+true"
                sx={{
                    backgroundColor: '#009673',
                    color: '#FFFFFF',
                    width: {
                        lg: '7rem',
                        xs: '7rem'
                    }
                }}
                onClick={handleClickOpen}
            >
                Volver
            </BotonMUI>

            <BotonMUI
                buttoncontainedsmallfinalizar="+true"
                onClick={() => {
                    handleFinalizar();
                    handleSubmit();
                }}
                sx={{
                    width: {
                        lg: '7rem',
                        xs: '7rem'
                    }
                }}
                disabled={finalizar === 'Finalizar' ? false : true}
            >
                {finalizar}
            </BotonMUI>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {mensaje}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Link to={path} style={{ textDecoration: 'none' }}>
                        <Button>Aceptar</Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </>
    );
};

export { OuterFormButtons };
