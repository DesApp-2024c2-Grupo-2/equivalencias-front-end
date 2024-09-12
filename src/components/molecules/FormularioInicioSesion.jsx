import React, { useState } from 'react';
import { TituloBienvenida, Titulos } from '../atoms/Title/Titulos';
import { OlvidastePassword, OlvidastePasswordLink } from '../atoms/OlvidastePassword';
import LineaSeparacion from '../atoms/LineaSeparacion';
import { InputMUI, ContenedorInputs } from '../atoms/Input/InputMUI';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { Grid, styled } from '@mui/material';
import { Formulario } from '../atoms/Formulario/Formulario';
import { getLogin } from '../../services/usuario_service';
import bcrypt from 'bcryptjs';
import ResetPasswordModal from '../organisms/IniciarSesion/ResetPasswordModal';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const FormularioInicioSesion = () => {
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const grabarUsuario = async (user) => {
        const userInfo = {
            dni: user.dni,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            discord: user.discord,
            telefono: user.telefono,
            rol: user.rol,
            password: '********',
            id: user.id,
            estado: user.estado
        };

        Object.keys(userInfo).forEach(key => localStorage.setItem(key, JSON.stringify(userInfo[key])));
    };

    const ingresarAplicacion = (user) => {
        if (user.estado === 'Habilitado') {
            switch (user.rol) {
                case 'alumno':
                    window.location.href = '/usuario/equivalencias';
                    break;
                case 'directivo':
                case 'superusuario':
                    window.location.href = '/direccionDashboard';
                    break;
                default:
                    notifyError('Rol de usuario no reconocido');
            }
        } else {
            notifyError('Tu usuario no está habilitado');
            localStorage.clear();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loginBack = await getLogin(parseInt(dni));
            if (loginBack.status !== 200) throw new Error('Error al iniciar sesión');

            const user = loginBack.user;
            if (password === '') throw new Error('Usuario o contraseña incorrectos');

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error('Usuario o contraseña incorrectos');

            await grabarUsuario(user);
            ingresarAplicacion(user);

        } catch (error) {
            notifyError(error.message);
        }
    };

    const notifyError = (message) => {
        toast.error(message, {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <FormularioMain direction="column">
            <Grid container>
                <TituloBienvenida>
                    <Grid item xs={12}>
                        <Titulos titulogrande="+true" titulomarginbottom component="h2">
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
                    <form onSubmit={handleSubmit}>
                        <ContenedorInputs>
                            <InputMUI
                                type="text"
                                placeholder="DNI"
                                label="DNI"
                                variant="outlined"
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => setDni(e.target.value)}
                                value={dni}
                            />
                        </ContenedorInputs>

                        <ContenedorInputs>
                            <InputMUI
                                type="password"
                                placeholder="Contraseña"
                                label="Contraseña"
                                variant="outlined"
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </ContenedorInputs>

                        <OlvidastePassword>
                            <OlvidastePasswordLink href="#" onClick={handleOpenModal}>
                                ¿Olvidaste tu contraseña?
                            </OlvidastePasswordLink>
                        </OlvidastePassword>
                        <ResetPasswordModal open={openModal} onClose={handleCloseModal} />
                        <LineaSeparacion />

                        <Grid>
                            <BotonMUI variant="contained" disableElevation type="submit">
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
    padding: 50px 0;
    border-radius: 20px;
    background: #fff;
    display: flex;
    margin: 0 auto;
`;

export { FormularioMain, FormularioInicioSesion };
