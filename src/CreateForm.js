import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { GridTop } from './GridTop';
import { FormUniOrigen } from './FormUniOrigen';
import { BotonMUI } from './components/atoms/Button/BotonMUI';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { OuterFormButtons } from './OuterFormButtons';
import { config } from '../src/config/config';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import FormUnahur from './FormUnahur';

const CreateForm = () => {
    const [materias, setMaterias] = useState([
        {
            key: nanoid(),
            notaAprobacion: null,
            cargaHorariaTotal: null,
            anioAprobacion: '',
            materiaAprobada: '',
            universidadOrigen: 1,
            certificado: false
        }
    ]);

    const [materiasUnahur, setMateriasUnahur] = useState([
        {
            key: '',
            materiaUnahur: '',
            estado: 'pendiente'
        }
    ]);
    const [formValue, setformValue] = useState({
        carreraUnahur: ''
    });

    const notifyEnviarSinDatos = () => {
        toast.error('Debe completar todos los campos del formulario', {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    const notifyBorrarMateria = () => {
        toast.warn('Tiene que enviar al menos una materia', {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    const notifyExito = () => {
        toast.success('Equivalencia creada con éxito', {
            containerId: 'home',
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };

    const addMateria = () => {
        setMaterias((materias) => [
            ...materias,
            {
                key: nanoid(),
                notaAprobacion: null,
                cargaHorariaTotal: null,
                anioAprobacion: '',
                materiaAprobada: '',
                universidadOrigen: 1,
                certificado: false
            }
        ]);

        console.log('Agregar Materias: ', materias);
    };

    const addMateriaUnahur = () => {
        setMateriasUnahur((materiasUnahur) => [
            ...materiasUnahur,
            {
                key: nanoid(),
                materiaUnahur: '',
                estado: 'pendiente'
            }
        ]);
    };

    const handleChangeMateriaUnaHur = (event) => {
        const { name, value } = event.target;
        setformValue((carrera) => ({
            ...carrera,
            [name]: value
        }));
    };

    const handleChangeCarrera = (event) => {
        const { name, value } = event.target;
        setformValue((carrera) => ({
            ...carrera,
            [name]: value
        }));
    };

    const handleChangeArray = (event, key) => {
        const indiceMateria = materias.findIndex((e) => e.key === key);
        console.log(materias);
        console.log(key);
        console.log(indiceMateria);
        console.log(materias[indiceMateria]);
        setMaterias((materias) => {
            return [
                ...materias.slice(0, indiceMateria),
                {
                    ...materias[indiceMateria],
                    [event.target.name]: event.target.value
                },
                ...materias.slice(indiceMateria + 1)
            ];
        });
    };
    console.log('Materias aprobadas: ', materias);

    const usuarioId = parseInt(JSON.parse(localStorage.getItem('id')));

    const handleSubmit = async () => {
        let equivalencia;

        if (usuarioId) {
            equivalencia = {
                nombre: formValue.materiaSolicitada,
                carrera: formValue.carreraUnahur,
                estado: 'Pendiente',
                observaciones: '',
                instituto: 'Instituto de Tecnología e Ingeniería',
                array: materias.map((item) => {
                    return {
                        nota: item.notaAprobacion,
                        carga_horaria: item.cargaHorariaTotal,
                        año_aprobacion: item.anioAprobacion,
                        nombre_materia: item.materiaAprobada,
                        UniversidadOrigenId: 1,
                        certificado: item.certificado
                    };
                }),
                UsuarioId: usuarioId
            };
        }

        console.log('Equivalencia:', equivalencia);

        const response = await axios
            .post(`${config.apiUrl}/equivalencias/createx3`, equivalencia, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                try {
                    console.log('Res:', res);
                    res.status === 200 ? notifyExito() : notifyEnviarSinDatos();
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log('Error: ', error);
                notifyEnviarSinDatos();
            });
    };

    const [materiaEliminar, setMateriaEliminar] = React.useState(null);

    const handleClickOpen = (materia) => {
        setMateriaEliminar(materia);
    };

    const handleClose = () => {
        setMateriaEliminar(null);
    };

    return (
        <>
            <GridTop
                item
                container
                blanco
                xs={11.5}
                md={7}
                marginTop={{
                    xs: '30px'
                }}
                sx={{
                    height: 'auto'
                }}
            >
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    sm={12}
                    padding={{
                        xs: '20px 30px',
                        sm: '20px 60px'
                    }}
                    sx={{
                        height: 'auto',
                        borderRadius: '10px 10px 0px 0px'
                    }}
                >
                    <FormUnahur
                        formValue={formValue}
                        carreras={carreras}
                        materias={materiasUnahur}
                        handleChange={handleChangeCarrera}
                        handleChangeMateriaUnaHur={handleChangeMateriaUnaHur}
                    />
                </Grid>

                <Grid
                    item
                    container
                    xs={12}
                    sx={{
                        borderTop: '1px solid #DADCE0',
                        marginTop: '20px ',
                        padding: '0px 40px'
                    }}
                >
                    <BotonMUI
                        buttoncontainedaddmateria
                        variant="outlined"
                        sx={{ margin: '10px 0px' }}
                        onClick={addMateriaUnahur} //Modificar onClick para que agregue otro grid de agregar materia
                    >
                        Agregar materia
                    </BotonMUI>
                </Grid>

                {materias.map((materia) => {
                    console.log(materia.key);
                    return (
                        <>
                            <FormUniOrigen
                                key2={materia.key}
                                key={materia.key}
                                handledelete={() => {
                                    console.log(formValue);

                                    if (materias.length > 1) {
                                        handleClickOpen(materia);
                                    } else {
                                        notifyBorrarMateria();
                                    }
                                }}
                                handleChangeArray={handleChangeArray}
                                formValueArray={materia}
                            />

                            <Dialog
                                open={materiaEliminar !== null}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {'Borrar materia del formulario'}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        ¿Seguro/a que desea borrar esta materia?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setMaterias(() =>
                                                //Se eliminó el parámetro materias en setMaterias
                                                materias.filter(
                                                    (x) =>
                                                        x.key !==
                                                        materiaEliminar.key
                                                )
                                            );
                                            handleClose();
                                        }}
                                    >
                                        Aceptar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    );
                })}

                <Grid
                    item
                    container
                    xs={12}
                    sx={{
                        borderTop: '1px solid #DADCE0',
                        marginTop: '20px ',
                        padding: '0px 40px'
                    }}
                >
                    <BotonMUI
                        buttoncontainedaddmateria
                        variant="outlined"
                        sx={{ margin: '10px 0px' }}
                        onClick={addMateria}
                    >
                        Agregar materia
                    </BotonMUI>
                </Grid>
            </GridTop>
            <OuterFormButtons
                handleSubmit={handleSubmit}
                path={'/usuario/equivalencias'}
                titulo={'Descartar formulario'}
                mensaje={'¿Está seguro/a de que desea descartar el formulario?'}
            />
        </>
    );
};

const carreras = [
    { label: 'Informática', instituto: 'Instituto de Tecnología e Ingeniería' }
];

export { CreateForm };
