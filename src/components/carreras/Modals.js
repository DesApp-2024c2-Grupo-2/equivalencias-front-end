import { Box, Grid, Modal, Button } from '@mui/material';
import { Titulos } from '../atoms/Title/Titulos';
import { StandardInput } from '../atoms/Input/InputMUI';
import MultipleSelect from '../atoms/Input/MultipleSelect';
import MultipleSelectEdit from '../atoms/Input/MultipleSelectEdit';
import * as React from 'react';
import { useEffect } from 'react';

export const ModalEliminarCarrera = (props) => {
    const { openEliminar, handleCloseEliminar, handleDelete } = props;

    return (
        <Modal
            open={openEliminar}
            onClose={handleCloseEliminar}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                opacity: [0.6]
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}
            >
                <Grid container spacing={2}>
                    <Titulos component="h1">Eliminar Carrera</Titulos>
                    <Grid item container justifyContent="space-between" xs={12}>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            onClick={handleDelete}
                        >
                            Aceptar
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCloseEliminar}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export const ModalEditarCarrera = (props) => {
    const {
        openEditar,
        handleCloseEditar,
        handleUpdate,
        handleChange,
        carreraSeleccionada,
        listaDirectivos,
        personName,
        setPersonName,
        dirId,
        setDirId
    } = props;

    const [primeraVez, setPrimeraVez] = React.useState(true);

    useEffect(() => {
        if (primeraVez) {
            setPrimeraVez(false);
        } else {
            const nombresDirActuales = carreraSeleccionada.directivosID.map(
                (dirs) => dirs.nombre
            );
            setPersonName(nombresDirActuales);
        }
    }, [openEditar]);

    return (
        <Modal
            open={openEditar}
            onClose={handleCloseEditar}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                opacity: [0.6]
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}
            >
                <Grid container spacing={2}>
                    <Titulos component="h1">Editar Carrera</Titulos>
                    <Grid item xs={12}>
                        <StandardInput
                            label="Nombre de la Carrera"
                            name="nombre_carrera"
                            value={
                                carreraSeleccionada &&
                                carreraSeleccionada.nombre_carrera
                            }
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <StandardInput
                            label="Nombre del Instituto"
                            name="nombre_instituto"
                            value={
                                carreraSeleccionada &&
                                carreraSeleccionada.nombre_instituto
                            }
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MultipleSelectEdit
                            listaDirectivos={listaDirectivos}
                            personName={personName}
                            setPersonName={setPersonName}
                            dirId={dirId}
                            setDirId={setDirId}
                            directivosActuales={
                                carreraSeleccionada.directivosID
                            }
                        ></MultipleSelectEdit>
                    </Grid>
                    <Grid item container justifyContent="space-between" xs={12}>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            onClick={handleUpdate}
                        >
                            Editar
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCloseEditar}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export const ModalAgregarCarrera = (props) => {
    const {
        openAgregar,
        handleCloseAgregar,
        handleSubmit,
        handleChange,
        handleChangeDirectivo,
        nombresDirectivos,
        formValue,
        listaDirectivos
    } = props;

    return (
        <Modal
            open={openAgregar}
            onClose={handleCloseAgregar}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}
            >
                <Grid container spacing={2}>
                    <Titulos component="h1">Agregar Carrera</Titulos>
                    <Grid item xs={12}>
                        <StandardInput
                            label="Nombre de la Carrera"
                            name="nombre_carrera"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <StandardInput
                            label="Nombre del Instituto"
                            name="nombre_instituto"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MultipleSelect
                            nombresDirectivos={nombresDirectivos}
                            handleChangeDirectivo={handleChangeDirectivo}
                            listaDirectivos={listaDirectivos}
                        />

                        {/* <AutocompleteInput
                            size="small"
                            variant="outlined"
                            onSelect={handleChangeDirectivo}
                            disablePortal
                            options={nombresDirectivos}
                            renderInput={(params) => (
                                <TextField
                                    required
                                    {...params}
                                    label="Directivo a asignar"
                                    name="directivo"
                                    value={formValue.directivo || ''}
                                />
                            )}
                        /> */}
                    </Grid>

                    <Grid item container justifyContent="space-between" xs={12}>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Agregar
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCloseAgregar}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};
