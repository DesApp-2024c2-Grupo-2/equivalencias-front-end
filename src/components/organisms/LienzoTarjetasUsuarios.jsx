import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Button, Grid } from '@mui/material';  // Asegúrate de importar Grid
import { Link } from 'react-router-dom';  // Importar Link para la navegación
import EquivalenciaCard from '../atoms/EquivalenciaCard/EquivalenciaCard';  // Componente de las tarjetas
import { getEquivalencia, getEquivalenciaUsuario } from '../../services/equivalencia_service';  // Servicios
import { getUsuario_carrera } from '../../services/usuarios_carreras_service';  // Servicio para obtener carreras
import { ActionButtons } from '../atoms/Button/ActionButtons';
import UsuarioCard from '../atoms/UsuarioCard/UsuarioCard';
import { getUsuarios } from '../../services/usuario_service';


const LienzoTarjetasUsuarios = ({ rol, searchQuery }) => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchUsuarioData = async () => {
            let obtainedUsuarioData = [];
            
            // Obtención de los datos de los usuarios desde el servicio
            obtainedUsuarioData = await getUsuarios();
            
            // Mapeo de los datos para ajustarlos al formato esperado
            const array = obtainedUsuarioData.map((arrayItem) => {
                const arrayUsuario = `${arrayItem.nombre} ${arrayItem.apellido}`;
                const arrayDni = arrayItem.dni;
                const arrayMail = arrayItem.email;
                const arrayRol = arrayItem.rol;
                const arrayTel = arrayItem.telefono;
                const arrayEstado = arrayItem.estado;

                return {
                    usuario: arrayUsuario,
                    dni: arrayDni,
                    email: arrayMail,
                    rol: arrayRol,
                    tel: arrayTel,
                    estado: arrayEstado
                };
            });

            // Filtrado de los datos según la búsqueda
            let filteredData = array;
            filteredData = applySearchFilter(filteredData, searchQuery);
            filteredData = applyRoleFilter(filteredData, rol);
            // Establecer las tarjetas filtradas
            setCards(filteredData);
        };

        fetchUsuarioData();
    }, [rol, searchQuery]);

    // Función para aplicar el filtro de búsqueda
    const applySearchFilter = (data, searchQuery) => {
        if (!searchQuery) return data;
        return data.filter((d) => {
            const queryValue = searchQuery.value.toLowerCase();
            switch (searchQuery.column) {
                case 'dni':
                    return d.dni.toString().toLowerCase().includes(queryValue);
                case 'usuario':  // Se cambió 'solicitante' por 'usuario'
                    return d.usuario.toLowerCase().includes(queryValue);
                case 'estado':
                    return d.estado.toLowerCase().includes(queryValue);
                default:
                    return true;
            }
        });
    };

    const applyRoleFilter = (data, rol) => {
        if (rol === 'Todos' || !rol) return data;
        return data.filter((d) => d.rol.toLowerCase() === rol.toLowerCase());
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
                <UsuarioCard
                    key={index}
                    usuario={cardData.usuario}  // Cambié 'arrayUsuario' a 'usuario'
                    dni={cardData.dni}          // Cambié 'arrayDni' a 'dni'
                    email={cardData.email}      // Cambié 'arrayMail' a 'email'
                    tel={cardData.tel}          // Cambié 'arrayTel' a 'tel'
                    rol={cardData.rol}          // Cambié 'arrayRol' a 'rol'
                    estado={cardData.estado}    // Cambié 'arrayEstado' a 'estado'
                />
            ))}
        </Paper>
    );
};

export default LienzoTarjetasUsuarios;