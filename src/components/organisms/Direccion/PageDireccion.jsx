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

const PageDireccion = () => {
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
                        <Titulos component="h2" titulogrande>
                            Solicitudes de equivalencias
                        </Titulos>
                    </Grid>
                </GridTop>

                <GridTop
                    item
                    container
                    blanco="+true"
                    search
                    searchPlaceholder
                    searchProps
                    debounceSearchRender
                    xs={11.5}
                    md={9}
                    lg={7}
                    sx={{
                        height: '5rem',
                        borderBottom: 'none',
                        borderBottomLeftRadius: '0px',
                        borderBottomRightRadius: '0px'
                    }}
                >
                    {/* Busqueda de equivalencias*/}
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        borderColor={'grey'}
                        xs={12}
                        sx={{
                            height: 'auto',
                            marginLeft: '40px'
                        }}
                    >
                        <Titulos component="h3">
                            Historial de equivalencias
                        </Titulos>

                        <Autocomplete
                            disablePortal
                            id="combo-box-universidades"
                            onChange={(event, newValue) => {
                                setUniversidad(newValue);
                            }}
                            {...defaultProps}
                            sx={{ width: '25%', marginLeft: '2%' }}
                            renderInput={(params) => (
                                <TextField {...params} label="Universidades" />
                            )}
                        />

                        <Autocomplete
                            disablePortal
                            id="combo-box-materias"
                            onChange={(event, newValue) => {
                                setMateriaAprobada(newValue);
                            }}
                            {...defaultPropsMaterias}
                            sx={{ width: '25%', marginLeft: '2%' }}
                            renderInput={(params) => (
                                <TextField {...params} label="Materias" />
                            )}
                        />

                        <Button
                            id="boton-busqueda-equivalencias"
                            sx={{ width: 120 }}
                            onClick={handleBuscar}
                        >
                            Buscar
                        </Button>
                    </Grid>
                    <BusquedaMateriasModal
                        open={openModalMateria}
                        onCloseBoton={handleCloseModalMateria}
                        materiasAprobadas={equivFiltradas}
                        universidad={
                            universidad ? universidad.nombre_universidad : ''
                        }
                    />
                </GridTop>

                <GridTop
                    item
                    container
                    blanco="+true"
                    search
                    searchPlaceholder
                    searchProps
                    debounceSearchRender
                    xs={11.5}
                    md={9}
                    lg={7}
                    sx={{
                        height: '5rem',
                        borderBottom: 'none',
                        borderBottomLeftRadius: '0px',
                        borderBottomRightRadius: '0px'
                    }}
                >
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        borderColor={'grey'}
                        xs={12}
                        sx={{
                            height: 'auto',
                            marginLeft: '40px'
                        }}
                    >
                        <Paper
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                boxShadow: 'none',
                                backgroundColor: 'rgba(245, 245, 245, 0.7)',
                                borderRadius: '10px',
                                width: '220px'
                            }}
                        >
                            <SearchIcon
                                id="icon-search-bar"
                                ref={iconSearch}
                                sx={{
                                    m: '10px',
                                    color: 'rgba(0, 0, 0, 0.64)'
                                }}
                            />
                            {/* </IconButton> */}
                            <InputBase
                                id="search-bar"
                                ref={inputSearch}
                                className="text"
                                onInput={(e) => {
                                    e.preventDefault();
                                    setSearchQuery((prevState) => ({
                                        ...prevState,
                                        value: e.target.value
                                    }));
                                }}
                                variant="outlined"
                                placeholder="Buscar"
                                sx={{ width: '220px' }}
                                onFocus={() => {
                                    iconSearch.current.style.display = 'none';

                                    inputSearch.current.style.margin =
                                        '6px 20px';
                                }}
                                onBlur={() => {
                                    iconSearch.current.style.display = 'block';

                                    inputSearch.current.style.margin =
                                        '0px 0px';
                                }}
                            />
                        </Paper>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={searchQuery.column}
                            label="Age"
                            onChange={handleChange}
                            size="small"
                            sx={{
                                marginLeft: '1%'
                            }}
                        >
                            <MenuItem value="dni">DNI</MenuItem>
                            <MenuItem value="solicitante">Solicitante</MenuItem>
                            <MenuItem value="estado">Estado</MenuItem>
                        </Select>
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
                    {/* <StickyHeadTable searchQuery={searchQuery} /> */}
                </GridTop>
            </Grid>
        </Grid>
    );
};

export { PageDireccion };
