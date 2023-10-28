import React, { useState } from 'react';
import { TituloBienvenida, Titulos } from '../atoms/Title/Titulos';
import {
    OlvidastePassword,
    OlvidastePasswordLink
} from '../atoms/OlvidastePassword';
import LineaSeparacion from '../atoms/LineaSeparacion';
import { InputMUI, ContenedorInputs } from '../atoms/Input/InputMUI';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { Grid, styled } from '@mui/material';
import { Formulario } from '../atoms/Formulario/Formulario';
import { useEffect } from 'react';
import { getLogin } from '../../services/usuario_service';
import bcrypt from 'bcryptjs';
import ResetPasswordModal from '../organisms/IniciarSesion/ResetPasswordModal';

const FormularioInicioSesion = () => {
    const [dni, setDni] = useState(null);
    const [password, setPassword] = useState('');
    const [usuario, setUsuario] = useState([null]);

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        /*
        const fetchUsuariosData = async () => {
            const usuarios = await getUsuarios();

            setUsuarios(usuarios);
        };

        fetchUsuariosData();
        */
    }, []);

    const grabarUsuario = async (user) => {
        localStorage.setItem('dni', JSON.stringify(user.dni));
        localStorage.setItem('nombre', JSON.stringify(user.nombre));
        localStorage.setItem('apellido', JSON.stringify(user.apellido));
        localStorage.setItem('email', JSON.stringify(user.email));
        localStorage.setItem('discord', JSON.stringify(user.discord));
        localStorage.setItem('telefono', JSON.stringify(user.telefono));
        localStorage.setItem('rol', JSON.stringify(user.rol));
        localStorage.setItem('password', JSON.stringify('********'));
        localStorage.setItem('id', JSON.stringify(user.id));
        localStorage.setItem('estado', JSON.stringify(user.estado));
    };

    const ingresarAplicacion = async (user) => {
        setUsuario(user);
        if (user.rol == 'alumno' && user.estado == 'Habilitado') {
            window.location.href = '/usuario/equivalencias';
        } else if (user.rol == 'directivo' && user.estado == 'Habilitado') {
            window.location.href = '/direccionDashboard';
        } else if (user.rol == 'superusuario' && user.estado == 'Habilitado') {
            window.location.href = '/direccionDashboard'; //superusuario/solicitudes direccion anterior
        } else {
            window.alert('Tu usuario no está habiltado');
            localStorage.clear();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(dni);

        getLogin(parseInt(dni))
            .then(function (loginBack) {
                // controlor de login y mensaje al usuario:
                console.log('login: ', loginBack);
                if (loginBack.status != 200) {
                    throw loginBack.message;
                }
                return loginBack.user;
            })
            .then(function (user) {
                // corroborar la contraseña:
                const mensajeError = 'Usuario o contraseña incorrectos';
                console.log('primer console: ', user);
                if (password != '') {
                    bcrypt.compare(
                        password,
                        user.password,
                        async function (err, isMatch) {
                            if (err || !isMatch) {
                                alert(mensajeError);
                            } else {
                                await grabarUsuario(user);

                                await ingresarAplicacion(user);
                            }
                        }
                    );
                } else {
                    throw 'Usuario o contraseña incorrectos';
                }
            })
            .catch(function (error) {
                return alert(error);
            });
    };

    return (
        <FormularioMain>
            <Grid container>
                <TituloBienvenida>
                    <Grid item xs={12}>
                        <Titulos
                            titulogrande="+true"
                            titulomarginbottom
                            component="h2"
                        >
                            ¡Bienvenido/a!
                        </Titulos>
                        <Titulos titulochico titulolight component="h2">
                            Iniciar sesión
                        </Titulos>
                    </Grid>
                </TituloBienvenida>
            </Grid>

            <Formulario sx={{ marginTop: '10px' }}>
                <Grid item xs={12} sm={12}>
                    <form action="" onSubmit={handleSubmit} style={{}}>
                        <ContenedorInputs>
                            <InputMUI
                                type="text"
                                id="outlined-basic"
                                placeholder="DNI"
                                label="DNI"
                                variant="outlined"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={(e) => setDni(e.target.value)}
                                value={dni}
                            />
                        </ContenedorInputs>

                        <ContenedorInputs>
                            <InputMUI
                                type="password"
                                id="outlined-basic"
                                placeholder="Contraseña"
                                label="Contraseña"
                                variant="outlined"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </ContenedorInputs>

                        <OlvidastePassword>
                            <OlvidastePasswordLink
                                href="#"
                                onClick={handleOpenModal}
                            >
                                ¿Olvidaste tu contraseña?
                            </OlvidastePasswordLink>
                        </OlvidastePassword>
                        <ResetPasswordModal
                            open={openModal}
                            onClose={handleCloseModal}
                        />
                        <LineaSeparacion></LineaSeparacion>

                        <Grid>
                            <BotonMUI
                                variant="contained"
                                buttoncontained="+true"
                                disableElevation
                                type="submit"
                            >
                                Ingresar
                            </BotonMUI>
                        </Grid>
                    </form>
                </Grid>
            </Formulario>
        </FormularioMain>
    );
};

const FormularioMain = styled(Grid)`
    max-width: 100%;
    padding: 50px 0px;
    border-radius: 20px;
    background: #fff;
    display: row;
    margin: 0 auto;
`;

export { FormularioMain, FormularioInicioSesion };
