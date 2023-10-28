import styled from 'styled-components';
import { Registro } from '../organisms/Registro/Registro';
import { Titulos } from '../atoms/Title/Titulos';
import { BotonMUI } from '../atoms/Button/BotonMUI';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const SideRegistro = styled(Grid)`
    background: #009673;
    max-width: 100%;
    height: 100%;
    min-height: 250px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px 30px;
`;

const Register = () => {
    //esto es una cargada, o exceso de chat gpt2
    const onClick = (e) => {
        return <Registro />;
    };

    return (
        <SideRegistro>
            <Titulos
                centrar="+true"
                blanco="+true"
                titulogrande="+true"
                titulobold
                component="h1"
            >
                Trámites de Equivalencias
            </Titulos>

            <a href={'/registro'} style={{ textDecoration: 'none' }}>
                <BotonMUI buttonoutlined variant="outlined">
                    Registrarse
                </BotonMUI>
            </a>
        </SideRegistro>
    );
};

export { SideRegistro, Register };
