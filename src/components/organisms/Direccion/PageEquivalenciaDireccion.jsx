import {
    Grid,
    Paper,
    MenuItem,
    Select,
    Autocomplete,
    TextField,
    Button
} from '@mui/material';
import { GridTop } from '../../atoms/GridTop';
import { Titulos } from '../../atoms/Title/Titulos';
import { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import TablaEquivalencias from '../../molecules/TablaEquivalencias';
import IconButton from '@mui/material/IconButton';
import { Header } from '../../molecules/Header';
import { getInstitucionesHabilitadas } from '../../../services/institucionService';
import { getMateriaAprobadasPorUniversidad } from '../../../services/materias_aprobadas_services';
import BusquedaMateriasModal from '../Direccion/busquedaMateriasModal';
import { BotonMUI } from '../../atoms/Button/BotonMUI';

const PageEquivalenciaDireccion = () => {
    const [searchQuery, setSearchQuery] = useState({
        value: '',
        column: 'dni'
    });

    
    const iconSearch = React.createRef();
    const inputSearch = React.createRef();

    const handleChange = (event) => {
        setSearchQuery((prevState) => ({
            ...prevState,
            column: event.target.value
        }));
    };

    const [universidades, setUniversidades] = useState([]);
    const [universidad, setUniversidad] = useState({});
    const [materiasAprobadas, setmateriasAprobadas] = useState([]);
    const [materiaAprobada, setMateriaAprobada] = useState(null);

    const defaultProps = {
        options: universidades,
        getOptionLabel: (option) => option.nombre_universidad
    };
    const [openModalMateria, setOpenModalMateria] = useState(false);
    const handleOpenModalMateria = () => {
        setOpenModalMateria(true);
    };
    const handleCloseModalMateria = () => {
        setOpenModalMateria(false);
    };

    useEffect(() => {
        const traerUniversidades = async () => {
            const getUniversidades = await getInstitucionesHabilitadas();
            setUniversidades(getUniversidades);
        };

        traerUniversidades();
    }, []);

    const [primerRender, setPrimerRender] = useState(true);

    useEffect(() => {
        const buscarMaterias = async () => {
            const buscarMateriaAprobadas =
                await getMateriaAprobadasPorUniversidad(universidad.id);
            setmateriasAprobadas(buscarMateriaAprobadas);
        };
        if (primerRender) {
            setPrimerRender(false);
        } else if (universidad != null) {
            buscarMaterias();
        }
    }, [universidad]);

    const opcionesUnicas = materiasAprobadas.filter(
        (materia, index, self) =>
            self.findIndex(
                (m) => m.nombre_materia === materia.nombre_materia
            ) === index
    );

    const defaultPropsMaterias = {
        options: opcionesUnicas,
        getOptionLabel: (option) => option.nombre_materia
    };

    const [equivFiltradas, setequivFiltradas] = useState([]);

    const handleBuscar = async () => {
        if (materiaAprobada == null) {
            alert('Tenes que seleccionar una materia.');
        } else {
            const equivs = materiasAprobadas.filter(
                (mat) => mat.nombre_materia == materiaAprobada.nombre_materia
            );
            setequivFiltradas(equivs);
            handleOpenModalMateria();
        }
    };

    useEffect(() => {}, [materiasAprobadas]);

    return (
        <Grid container direction="column">
            <Grid item container xs={12}>
                <Header name="Instituciones" paginaPrincipal="/" />
            </Grid>

            <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ padding: '40px 0px' }}
            >
    <GridTop
        item
        container
        xs={11.5}
        md={7}
        sx={{
            padding: '0px 20px'
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
            >   
    <Grid item>
            <Link to="/direccionDashboard">
                <IconButton sx={{ padding: 0 }}>
                  <ArrowBackIcon />
                </IconButton>
            </Link>
            <Grid container alignItems="center"
                sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Titulos component="h2" titulogrande >
                    Solicitudes de equivalencias
                </Titulos>
                <Link
                    to="/direccion/historial"
                    style={{ textDecoration: 'none' }}
                >
                    <BotonMUI
                        buttoncontainedsmall
                        sx={{
                            width: 'auto',
                            marginLeft: '500px',// No esta bien. Buscar alguna forma NO FIJA
                            display: { sm: 'flex', xs: 'none' },

                        }}
                    >
                        Ver Historial
                    </BotonMUI>
                </Link>
            </Grid>
        </Grid>
    </GridTop>


    <GridTop
        item
        container
        blanco
        xs={11.5}
        md={9}
        lg={7}
        maxWidth={'95vw'}
     sx={{
            height: 'auto',
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px'
        }}
        >
    <TablaEquivalencias searchQuery={searchQuery} />
    </GridTop>
        </Grid>
        </Grid>
    );
};

export { PageEquivalenciaDireccion };

