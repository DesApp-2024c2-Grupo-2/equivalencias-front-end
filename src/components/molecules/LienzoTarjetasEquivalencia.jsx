import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Button, Grid } from '@mui/material';  // Asegúrate de importar Grid
import { Link } from 'react-router-dom';  // Importar Link para la navegación
import EquivalenciaCard from '../atoms/EquivalenciaCard/EquivalenciaCard';  // Componente de las tarjetas
import { getEquivalencia, getEquivalenciaUsuario } from '../../services/equivalencia_service';  // Servicios
import { getUsuario_carrera } from '../../services/usuarios_carreras_service';  // Servicio para obtener carreras
import { ActionButtons } from '../atoms/Button/ActionButtons';


const filterNameMat = (materias) => {
    let stringSalida = '';
    let cant = materias.length;
    if (cant == 1) {
        stringSalida = materias[0].nombre;
    } else if (cant == 2) {
        stringSalida = materias[0].nombre + ', ' + materias[1].nombre;
    } else {
        stringSalida = `Cantidad de materias: ${cant}`;
    }
    return stringSalida;
};

// Función para mapear el estado a un color
const renderState = (estado) => {
    let color = 'success'; // Valor por defecto
    switch (estado) {
        case 'CERRADO':
        case 'RECHAZADO':
            color = 'error';
            break;
        case 'PENDIENTE':
            color = 'info';
            break;
        case 'FALTA COMPLETAR':
            color = 'warning';
            break;
        default:
            color = 'success';
    }
    return (
        <Button
            color={color}
            variant="outlined"
            fullWidth
            sx={{
                pointerEvents: 'none',
                borderRadius: 3,
                borderWidth: 4
            }}
        >
            {estado}
        </Button>
    );
};

// Función fuera del componente para evitar su recreación en cada render
/*const defineActions = (id, materias, rol) => {
    console.log(typeof(id))
    const color = materias.length > 3 ? 'error' : 'info';
    const actions = (
        <Grid
            container
            item
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            {rol === 'directivo' || rol === 'superusuario' ? (
                <Link
                    to={`/direccion/revision/${id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <ActionButtons color={color} />
                </Link>
            ) : (
                <Link
                    to={`/usuario/visualizar/${id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <ActionButtons color={color} />
                </Link>
            )}
        </Grid>
    );
    console.log("Actions:",actions)
    return actions;
};*/

const defineActions = (id, materias, rol) => {
    const color = materias.length > 3 ? 'error' : 'info';
    const linkTo =
        rol === 'directivo' || rol === 'superusuario'
            ? `/direccion/revision/${id}`
            : `/usuario/visualizar/${id}`;

    console.log('Link generado:', linkTo);
    
    return (linkTo
        /*<Link to={linkTo} style={{ textDecoration: 'none' }}>
            <ActionButtons color={color} />
        </Link>*/
    );
};

// Componente principal
const LienzoTarjetasEquivalencia = ({ rol, searchQuery }) => {
    const [cards, setCards] = useState([]);
    const [carreras, setCarreras] = useState([]);

    useEffect(() => {
        const fetchCarrerasData = async () => {
            if (rol === 'directivo') {
                const carrerasData = await getUsuario_carrera(JSON.parse(localStorage.getItem('id')));
                setCarreras(carrerasData);
            }
        };
        fetchCarrerasData();
    }, [rol]);

    useEffect(() => {
        const fetchEquivalenciaData = async () => {
            let obtainedEquivalenciaData = [];
            if (rol === 'directivo' || rol === 'superusuario') {
                obtainedEquivalenciaData = await getEquivalencia();
            } else {
                const usuarioId = parseInt(JSON.parse(localStorage.getItem('id')));
                obtainedEquivalenciaData = await getEquivalenciaUsuario(usuarioId);
            }

            const array = obtainedEquivalenciaData.map((arrayItem) => {
                const d = new Date(arrayItem.Materia_solicitadas[0].createdAt);
                const dateTime = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
                const carrera = arrayItem.Materia_solicitadas[0].carrera;
                const status = renderState(arrayItem.estado.toUpperCase());
                const actions = defineActions(arrayItem.id, arrayItem.Materia_solicitadas, rol);

                return {
                    materiaSolicitada: filterNameMat(arrayItem.Materia_solicitadas),
                    fecha: dateTime,
                    estado: status,
                    solicitante: `${arrayItem.Usuario.nombre} ${arrayItem.Usuario.apellido}`,
                    dni: arrayItem.Usuario.dni,
                    linkVisualizar: actions,
                    carrera,
                };
            });

            let filteredData = array;
            if (rol === 'directivo') {
                const carrerasList = carreras.map((carrera) => carrera.Carrera.nombre_carrera);
                filteredData = array.filter((usuario) => carrerasList.includes(usuario.carrera));
            }

            filteredData = applySearchFilter(filteredData, searchQuery);
            setCards(filteredData);
        };

        fetchEquivalenciaData();
    }, [rol, searchQuery, carreras]);

    const applySearchFilter = (data, searchQuery) => {
        if (!searchQuery) return data;
        return data.filter((d) => {
            const queryValue = searchQuery.value.toLowerCase();
            switch (searchQuery.column) {
                case 'dni':
                    return d.dni.toString().toLowerCase().includes(queryValue);
                case 'solicitante':
                    return d.solicitante.toLowerCase().includes(queryValue);
                case 'estado':
                    return d.estado.toLowerCase().includes(queryValue);
                case 'carrera':
                    return d.carrera.toLowerCase().includes(queryValue);
                case 'materiaSolicitada':
                    return d.materiaSolicitada.toLowerCase().includes(queryValue);
                default:
                    return true;
            }
        });
    };

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                overflowX: 'hidden',  // Evita el desplazamiento horizontal
                borderRadius: '10px',
                boxShadow: 'none',
                padding: '20px',
                display: 'flex',
                flexWrap: 'wrap', // Asegura que las cards se ajusten
                gap: '20px', // Espacio entre las cards
                justifyContent: 'center', // Centra las cards
                boxSizing: 'border-box' // Asegura que padding no cause desbordamiento
            }}
        >
            {cards.map((cardData, index) => (
                <EquivalenciaCard
                    key={index}
                    materiaSolicitada={cardData.materiaSolicitada}
                    carrera={cardData.carrera}
                    fecha={cardData.fecha}
                    estado={cardData.estado}
                    linkVisualizar={cardData.linkVisualizar}
                    solicitante={cardData.solicitante}
                    dni={cardData.dni}
                />
            ))}
        </Paper>
    );
};

export default LienzoTarjetasEquivalencia;
