import { Grid, Typography, styled } from '@mui/material';
import { css } from '@mui/styled-engine';

const TituloBienvenida = styled(Grid)`
    width: 100%;
    display: flex;
    text-align: center;
`;

const Titulos = styled(Typography)`
    color: #000;
    font-weight: medium;

    ${(props) =>
        props.centrar &&
        css`
            text-align: center;
        `}

    ${(props) =>
        props.blanco &&
        css`
            color: #fff;
        `}

	${(props) =>
        props.titulogrande &&
        css`
            font-size: 2.3em;
        `}

    ${(props) =>
        props.titulobold &&
        css`
            font-weight: bold;
        `}

    ${(props) =>
        props.titulochico &&
        css`
            font-size: 1.875em;
        `}

    ${(props) =>
        props.titulolight &&
        css`
            font-weight: lighter;
        `}

    ${(props) =>
        props.titulomarginbottom &&
        css`
            margin-bottom: 30px;
        `}

    ${(props) =>
        props.titulolabel &&
        css`
            font-size: 1.3em;
        `}
`;

export { TituloBienvenida, Titulos };
