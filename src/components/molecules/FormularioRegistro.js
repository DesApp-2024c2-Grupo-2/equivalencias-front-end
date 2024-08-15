import React, { useState } from 'react';
import { Titulos } from '../atoms/Title/Titulos';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { Grid, MenuItem, styled, Select, TextField } from '@mui/material';
import { Formulario } from '../atoms/Formulario/Formulario';
import { postUsuarios } from '../../services/usuario_service';
import { useHistory } from 'react-router-dom';

import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const FormularioRegistro = () => {
    const [formValue, setFormValue] = useState({
        dni: '',
        nombre: '',
        apellido: '',
        email: '',
        discord: '',
        telefono: '',
        rol: 'alumno',
        password: '',
        estado: 'Habilitado'
    });

    const [errorDNI, setErrorDNI] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorNombre, setErrorNombre] = useState(false);
    const [errorApellido, setErrorApellido] = useState(false);
    const [errorDiscord, setErrorDiscord] = useState(false);
    const [errorTelefono, setErrorTelefono] = useState(false);

    const [errorPassword, setErrorPassword] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const validateField = (value, regex) => {
        return regex.test(value);
    };

    const notifyExito = () => {
        toast.success('Registro creado con éxito', {
            containerId: 'home',
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    const notifyError = () => {
        toast.error('Debe completar todos los campos del formulario', {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fieldsToValidate = [
            { field: 'dni', regex: /^\d{8}$/ },
            { field: 'email', regex: /^\S+@\S+\.\S+$/ },
            {
                field: 'password',
                regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
            },
            { field: 'nombre', regex: /^[\p{L}\s]+$/u },
            { field: 'apellido', regex: /^[\p{L}\s]+$/u },

            { field: 'discord', regex: /^[a-zA-Z0-9#]+$/ },
            { field: 'telefono', regex: /^\d{10}$/ }
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

        if (valid) {
            const {
                dni,
                nombre,
                apellido,
                email,
                discord,
                telefono,
                rol,
                password,
                estado
            } = formValue;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const response = await postUsuarios(
                dni,
                nombre,
                apellido,
                email,
                discord,
                telefono,
                rol,
                hashedPassword,
                estado
            );

            if (response.status === 200) {
                notifyExito();
                history.push('/');
            } else {
                notifyError();
            }
        }

        if (!valid) {
            notifyError();
        }
    };

    const setErrorState = (stateName, value) => {
        switch (stateName) {
            case 'setErrorDni':
                setErrorDNI(value);
                break;
            case 'setErrorNombre':
                setErrorNombre(value);
                break;
            case 'setErrorApellido':
                setErrorApellido(value);
                break;
            case 'setErrorEmail':
                setErrorEmail(value);
                break;
            case 'setErrorDiscord':
                setErrorDiscord(value);
                break;
            case 'setErrorTelefono':
                setErrorTelefono(value);
                break;
            case 'setErrorPassword':
                setErrorPassword(value);
                break;
            default:
                break;
        }
    };

    return (
        <FormularioMain
            item
            container
            blanco
            xs={11.5}
            md={7}
            marginTop={{
                xs: '3px'
            }}
            sx={{
                height: 'auto'
            }}
        >
            <Formulario
                item
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sm={12}
                padding={{
                    xs: '20px 30px',
                    sm: '20px 40px'
                }}
                sx={{
                    height: 'auto',
                    borderRadius: '10px 10px 0px 0px'
                }}
            >
                <form
                    action=""
                    onSubmit={handleSubmit}
                    style={{
                        height: '100%',
                        textAlign: 'center',
                        marginTop: '1px'
                    }}
                >
                    <Grid
                        item
                        container
                        direction="column"
                        alignItems="flex-start"
                        justifyContent="center"
                        md={12}
                        lg={5.8}
                        sx={{
                            marginTop: '6px',
                            fontSize: '24px', // Ajustar el tamaño de la fuente
                            lineHeight: '32px'
                        }}
                    >
                        <Titulos titulomarginbottom component="h2">
                            Registrate
                        </Titulos>
                    </Grid>

                    <Grid
                        item
                        container
                        xs={12}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Grid
                            item
                            container
                            direction="column"
                            alignItems="flex-start"
                            md={6}
                            lg={5.8}
                            sx={{
                                marginBottom: '8px'
                            }}
                        >
                            <TextField
                                id="dni"
                                placeholder="DNI"
                                name="dni"
                                label="DNI"
                                type="dni"
                                value={formValue.dni}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                required
                                inputProps={{
                                    minLength: 1,
                                    maxLength: 8
                                }}
                                helperText={
                                    errorDNI ? 'Ingrese un DNI válido.' : ''
                                }
                                error={errorDNI}
                                fullWidth
                                onChange={(event) =>
                                    setFormValue({
                                        ...formValue,
                                        dni: event.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid
                            item
                            container
                            md={6}
                            lg={5.8}
                            sx={{
                                marginBottom: '8px'
                            }}
                        >
                            <TextField
                                placeholder="Email"
                                name="email"
                                label="Email"
                                value={formValue.email}
                                type="email"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                required
                                inputProps={{
                                    minLength: 1,
                                    maxLength: 100
                                }}
                                helperText={
                                    errorEmail
                                        ? 'Ingrese un correo válido.'
                                        : ''
                                }
                                error={errorEmail}
                                fullWidth
                                onChange={(event) =>
                                    setFormValue({
                                        ...formValue,
                                        email: event.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid
                            item
                            container
                            direction="column"
                            alignItems="flex-start"
                            md={6}
                            lg={5.8}
                            sx={{
                                my: 2
                            }}
                        >
                            <TextField
                                id="nombre"
                                placeholder="Nombre"
                                name="nombre"
                                label="Nombre"
                                type="nombre"
                                value={formValue.nombre}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                required
                                inputProps={{
                                    minLength: 1,
                                    maxLength: 20
                                }}
                                helperText={
                                    errorNombre
                                        ? 'Ingrese un Nombre válido.'
                                        : ''
                                }
                                error={errorNombre}
                                fullWidth
                                onChange={(event) =>
                                    setFormValue({
                                        ...formValue,
                                        nombre: event.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid
                            item
                            container
                            direction="column"
                            alignItems="flex-start"
                            md={12}
                            lg={5.8}
                            sx={{
                                my: 2
                            }}
                        >
                            <TextField
                                id="apellido"
                                placeholder="Apellido"
                                name="apellido"
                                label="Apellido"
                                type="apellido"
                                value={formValue.apellido}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                required
                                inputProps={{
                                    minLength: 1,
                                    maxLength: 20
                                }}
                                helperText={
                                    errorApellido
                                        ? 'Ingrese un Apellido válido.'
                                        : ''
                                }
                                error={errorApellido}
                                fullWidth
                                onChange={(event) =>
                                    setFormValue({
                                        ...formValue,
                                        apellido: event.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid
                            item
                            container
                            md={12}
                            lg={5.8}
                            sx={{
                                my: 1
                            }}
                        >
                            <TextField
                                id="telefono"
                                placeholder="Teléfono"
                                name="telefono"
                                label="Teléfono"
                                type="tel"
                                value={formValue.telefono}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                required
                                inputProps={{
                                    minLength: 8,
                                    maxLength: 10,
                                    pattern: '[0-9]{7,10}'
                                }}
                                helperText={
                                    errorTelefono
                                        ? 'Minímo entre 8 a 10 dígitos.'
                                        : ''
                                }
                                error={errorTelefono}
                                fullWidth
                                onChange={(event) =>
                                    setFormValue({
                                        ...formValue,
                                        telefono: event.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid
                            item
                            container
                            direction="column"
                            alignItems="flex-start"
                            md={12}
                            lg={5.8}
                            sx={{
                                my: 1
                            }}
                        >
                            <TextField
                                id="discord"
                                placeholder="Discord"
                                name="discord"
                                label="Discord"
                                type="text"
                                value={formValue.discord}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                required
                                inputProps={{
                                    minLength: 1,
                                    maxLength: 15
                                }}
                                helperText={
                                    errorDiscord
                                        ? 'Ingrese su usuario de Discord.'
                                        : ''
                                }
                                error={errorDiscord}
                                fullWidth
                                onChange={(event) =>
                                    setFormValue({
                                        ...formValue,
                                        discord: event.target.value
                                    })
                                }
                            />
                        </Grid>

                        <Grid
                            item
                            container
                            direction="column"
                            alignItems="flex-start"
                            md={12}
                            lg={5.8}
                            sx={{
                                my: 1
                            }}
                        >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formValue.rol}
                                label="Rol"
                                onChange={(event) => {
                                    if (event.target.value === 'alumno') {
                                        setFormValue({
                                            ...formValue,
                                            rol: event.target.value,
                                            estado: 'Habilitado'
                                        });
                                    } else if (
                                        event.target.value === 'directivo'
                                    ) {
                                        setFormValue({
                                            ...formValue,
                                            rol: event.target.value,
                                            estado: 'Deshabilitado'
                                        });
                                    }
                                }}
                            >
                                <MenuItem value={'alumno'}>Alumno</MenuItem>
                                <MenuItem value={'directivo'}>
                                    Directivo
                                </MenuItem>
                            </Select>
                        </Grid>

                        <Grid
                            item
                            container
                            direction="column"
                            alignItems="flex-start"
                            md={12}
                            lg={5.8}
                            sx={{
                                my: 1
                            }}
                        >
                            <TextField
                                id="password"
                                placeholder="Contraseña"
                                name="password"
                                label="Contraseña"
                                type="password"
                                value={formValue.password}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                required
                                inputProps={{
                                    minLength: 8
                                }}
                                helperText={
                                    errorPassword
                                        ? 'Debe contener al menos una letra minúscula, una letra mayúscula,' +
                                          ' un dígito (número) y una longitud mínima de 8 caracteres.'
                                        : ''
                                }
                                error={errorPassword}
                                fullWidth
                                onChange={(event) =>
                                    setFormValue({
                                        ...formValue,
                                        password: event.target.value
                                    })
                                }
                            />
                        </Grid>
                        <Grid
                            item
                            container
                            xs={12}
                            sx={{
                                borderTop: '1px solid #DADCE0',
                                marginTop: '20px ',

                                padding: '0px 40px',
                                justifyContent: 'center'
                            }}
                        >
                            <BotonMUI
                                buttoncontained
                                variant="outlined"
                                sx={{ margin: '20px 0px' }}
                                onClick={handleSubmit}
                                type="submit"
                            >
                                Registrarse
                            </BotonMUI>
                        </Grid>
                    </Grid>
                </form>
            </Formulario>
        </FormularioMain>
    );
};

const FormularioMain = styled(Grid)`
    width: 65%;
    max-width: 65%;
    height: 100%;

    border-radius: 20px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default FormularioRegistro;
