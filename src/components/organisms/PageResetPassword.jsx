import React, { useState } from 'react';
import { Container, Typography, TextField, Paper, Box } from '@mui/material';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { useParams } from 'react-router';
import { updatePassword } from '../../services/reset_services';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';

const PageResetPassword = () => {
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [formValue, setFormValue] = useState({
        DNI: '',
        password: ''
    });
    const [errorDNI, setErrorDNI] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordDif, setErrorPasswordDif] = useState(false);

    const { hash } = useParams();

    const validateField = (value, regex) => {
        return regex.test(value);
    };

    const handleReset = async () => {
        const { password, DNI } = formValue;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const fieldsToValidate = [
            { field: 'DNI', regex: /^\d{8}$/ },
            {
                field: 'password',
                regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
            }
        ];
        let valid = true;

        fieldsToValidate.forEach(({ field, regex }) => {
            if (!validateField(formValue[field], regex)) {
                setErrorState(
                    `setError${field.charAt(0).toUpperCase()}${field.slice(1)}`,
                    true
                );
                valid = false;
            } else {
                setErrorState(
                    `setError${field.charAt(0).toUpperCase()}${field.slice(1)}`,
                    false
                );
            }
        });

        if (valid && password == passwordConfirmation) {
            try {
                const update = await updatePassword(DNI, hashedPassword, hash);
                if (update === 200) {
                    setErrorPasswordDif(false);
                    notifyExito();
                } else {
                    throw 'error';
                }
            } catch (err) {
                console.log(err);
                notifyError();
            }
        } else {
            setErrorPasswordDif(true);
        }
    };

    const setErrorState = (stateName, value) => {
        switch (stateName) {
            case 'setErrorDni':
                setErrorDNI(value);
                break;
            case 'setErrorPassword':
                setErrorPassword(value);
                break;
            default:
                break;
        }
    };

    const notifyExito = () => {
        toast.success('Contraseña modificada con éxito', {
            containerId: 'home',
            position: 'bottom-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => {
                window.location.href = '/';
            }
        });
    };

    const notifyError = () => {
        toast.error('Se produjo un error al intentar modificar la contraseña', {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    return (
        <>
            <Box
                sx={{
                    width: '100vw', // Ocupar el 100% del ancho de la ventana
                    height: '100vh', // Ocupar el 100% de la altura de la ventana
                    backgroundColor: '#122c34', // Color de fondo para demostración
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Container
                    maxWidth="xs"
                    sx={{
                        display: 'flex',
                        minHeight: '100vh',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#122c34'
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 5,
                            width: '100%'
                        }}
                    >
                        <Typography variant="h5" marginBottom={2}>
                            Restablecer Contraseña
                        </Typography>
                        <TextField
                            label="DNI"
                            variant="outlined"
                            fullWidth
                            required
                            type="dni"
                            inputProps={{
                                minLength: 1,
                                maxLength: 8
                            }}
                            helperText={
                                errorDNI ? 'Ingrese un DNI válido.' : ''
                            }
                            error={errorDNI}
                            margin="normal"
                            value={formValue.DNI}
                            onChange={(event) =>
                                setFormValue({
                                    ...formValue,
                                    DNI: event.target.value
                                })
                            }
                        />
                        <TextField
                            label="Nueva Contraseña"
                            variant="outlined"
                            fullWidth
                            required
                            inputProps={{
                                minLength: 8
                            }}
                            margin="normal"
                            type="password"
                            value={formValue.password}
                            onChange={(event) =>
                                setFormValue({
                                    ...formValue,
                                    password: event.target.value
                                })
                            }
                            helperText={
                                errorPassword
                                    ? 'Debe contener al menos una letra minúscula, una letra mayúscula,' +
                                      ' un dígito (número) y una longitud mínima de 8 caracteres.'
                                    : ''
                            }
                            error={errorPassword}
                        />
                        <TextField
                            label="Confirmar Contraseña"
                            variant="outlined"
                            fullWidth
                            required
                            inputProps={{
                                minLength: 8
                            }}
                            margin="normal"
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                            helperText={
                                errorPasswordDif
                                    ? 'Las contraseñas no coinciden'
                                    : ''
                            }
                            error={errorPasswordDif}
                        />
                        <BotonMUI
                            variant="contained"
                            buttoncontained="+true"
                            onClick={handleReset}
                            sx={{ mt: 3 }}
                        >
                            Confirmar
                        </BotonMUI>
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default PageResetPassword;
