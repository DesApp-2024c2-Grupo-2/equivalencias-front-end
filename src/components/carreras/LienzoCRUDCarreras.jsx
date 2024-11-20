import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Button, Grid } from '@mui/material';  // Asegúrate de importar Grid
import { Link } from 'react-router-dom';  // Importar Link para la navegación
import { ActionButtons } from '../atoms/Button/ActionButtons';
import { getCarrerasConDirectivos } from '../../services/carrera_service';
import CarreraCard from '../atoms/CarreraCard/CarreraCard';
//import { dir } from 'console';


const LienzoCRUDCarreras = () => {
    const [cards, setCards] = useState([]);
    const [openState, setOpenState] = useState(false); // Estado para controlar si el modal o el diálogo está abierto
    const [selectedCarrera, setSelectedCarrera] = useState(null); // Estado para almacenar la carrera seleccionada

    // Funciones para las acciones
    const seleccionarCarrera = (carreraId) => {
        setSelectedCarrera(carreraId); // O cualquier otra lógica que quieras implementar
        setOpenState(true); // Mostrar el modal o diálogo
    };

    const handleClose = () => {
        setOpenState(false); // Cerrar el modal o diálogo
    };

    const handleUpdate = () => {
        // Implementa la lógica de actualización aquí
        console.log("Actualizar carrera con ID:", selectedCarrera);
        // Después de la actualización, cierra el modal
        handleClose();
    };

    const handleDelete = () => {
        // Implementa la lógica de eliminación aquí
        console.log("Eliminar carrera con ID:", selectedCarrera);
        // Después de la eliminación, cierra el modal
        handleClose();
    };

    function convertUTCtoLocalTime(utcDatetimeString) {
        const date = new Date(utcDatetimeString);
        return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }

    useEffect(() => {
        const fetchCarreraData = async () => {
            try {
                const { data: obtainedCarreraData } = await getCarrerasConDirectivos();

                console.log("Datos obtenidos:", obtainedCarreraData); // Verifica que los datos son correctos

                // Mapea los datos para ajustarlos al formato esperado
                const formattedData = obtainedCarreraData.map((item) => ({
                    carrera: item.nombre_carrera,
                    instituto: item.nombre_instituto,
                    fechaActualizacion: convertUTCtoLocalTime(item.updatedAt), // fechaActualizacion: item.updatedAt,
                    directivo: item.directivos.map((dir) => `${dir.nombre} ${dir.apellido}`).join(', ') || 'Directivo no asignado',
                    carreraId: item.id, // Agrega el ID de la carrera
                    directivosID: item.directivos.map((dir) => dir.id), // Agrega los ID de los directivos
                }));

                setCards(formattedData); // Establece los datos formateados en el estado
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchCarreraData();
    }, []);

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                borderRadius: '10px',
                padding: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
                boxSizing: 'border-box'
            }}
        >
            {cards.map((cardData, index) => (
                <CarreraCard
                    key={index}
                    carrera={cardData.carrera}
                    instituto={cardData.instituto}
                    fechaActualizacion={cardData.fechaActualizacion}
                    directivo={cardData.directivo}
                    carreraId={cardData.carreraId}
                    directivosID={cardData.directivosID}
                    seleccionarCarrera={seleccionarCarrera}
                    openState={openState}
                    handleClose={handleClose}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
            ))}
        </Paper>
    );
};

export default LienzoCRUDCarreras;