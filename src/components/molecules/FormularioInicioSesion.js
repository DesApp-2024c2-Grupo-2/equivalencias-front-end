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
import { getUsuarios } from '../../services/usuario_service';

import bcrypt from 'bcryptjs';
import { color } from '@mui/system';
import { blacklistedBrowsers } from 'dropzone';

const FormularioInicioSesion = () => {
    const [dni, setDni] = useState(null);
    const [password, setPassword] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuariosData = async () => {
            const usuarios = await getUsuarios();

            setUsuarios(usuarios);
        };

        fetchUsuariosData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(usuarios);
        /*
        const usuario = usuarios.find(
            (usuario) => usuario.dni === dni && usuario.password === password
        );
*/
        console.log(dni);
        const usuario = usuarios.find(
            (usuario) => usuario.dni === parseInt(dni)
        );

        // console.log(usuario);
        if (usuario) {
            bcrypt.compare(password, usuario.password, function (err, isMatch) {
                if (err) {
                    throw err;
                } else if (!isMatch) {
                    alert('Usuario o contraseña incorrectos');
                } else {
                    localStorage.setItem('dni', JSON.stringify(usuario.dni));
                    localStorage.setItem(
                        'nombre',
                        JSON.stringify(usuario.nombre)
                    );
                    localStorage.setItem(
                        'apellido',
                        JSON.stringify(usuario.apellido)
                    );
                    localStorage.setItem(
                        'email',
                        JSON.stringify(usuario.email)
                    );
                    localStorage.setItem(
                        'discord',
                        JSON.stringify(usuario.discord)
                    );
                    localStorage.setItem(
                        'telefono',
                        JSON.stringify(usuario.telefono)
                    );
                    localStorage.setItem('rol', JSON.stringify(usuario.rol));
                    localStorage.setItem(
                        'password',
                        JSON.stringify(usuario.password)
                    );
                    localStorage.setItem('id', JSON.stringify(usuario.id));

                    if (usuario.rol == 'alumno') {
                        window.location.href = '/usuario/equivalencias';
                    } else if (usuario.rol == 'directivo') {
                        window.location.href = '/direccionDashboard';
                    } else if (usuario.rol == 'superusuario') {
                        window.location.href = '/direccionDashboard'; //superusuario/solicitudes direccion anterior
                    }
                }
            });
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <FormularioMain>
            <Grid container>
                <TituloBienvenida>
                    <Grid item xs={12} sm={5}>
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
                                label="DNI"
                                variant="outlined"
                                onChange={(e) => setDni(e.target.value)}
                                value={dni}
                            />
                        </ContenedorInputs>

                        <ContenedorInputs>
                            <InputMUI
                                type="password"
                                id="outlined-basic"
                                label="Contraseña"
                                variant="outlined"
                                margin="normal"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </ContenedorInputs>

                        <OlvidastePassword>
                            <OlvidastePasswordLink href="https://www.google.com.ar">
                                ¿Olvidaste tu contraseña?
                            </OlvidastePasswordLink>
                        </OlvidastePassword>

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
