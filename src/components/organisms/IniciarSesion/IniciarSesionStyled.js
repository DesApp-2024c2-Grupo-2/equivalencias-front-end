import { Grid, styled } from '@mui/material';

const TarjetaLogin = styled(Grid)`
    margin: 0 auto;
    width: 100%;
    max-width: 55rem;
    height: auto%;
    border-radius: 20px;
    position: relative;
`;

const FatherContainer = styled(Grid)`
    display: flex;
    flex-flow: row wrap;
    position: absolute;
    width: 100%;
    background-color: #122c34;
    height: 100%;
    align-items: center;
`;

export { TarjetaLogin, FatherContainer };
