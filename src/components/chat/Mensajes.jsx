import cx from 'clsx';
import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Typography
} from '@mui/material';

import { styled } from '@mui/system';
import MensajesStyle from './MensajesStyle.js';
import AvatarIcon from '../atoms/AvatarIcon.jsx';
import { Fragment, useEffect, useState } from 'react';
import { cyan } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    updateMensaje,
    deleteMensaje
} from '../../services/mensajes_service.js';
import { getUsuario, getUsuarios } from '../../services/usuario_service.js';

const Mensajes = styled(MensajesStyle)((props) => {
    const { classes, mensajes, usuario_id, socket } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [hoveredMessage, setHoveredMessage] = useState(null);
    const [open, setOpen] = useState(false);
    const [editedMessage, setEditedMessage] = useState('');
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');

    const primerUltimoMensaje = (index, mensaje) =>
        index === 0 ||
        mensajes[index].id_remitente !== mensajes[index - 1].id_remitente
            ? classes[`${sidePorUsuario(mensaje)}First`]
            : index === mensajes.length - 1 ||
              mensajes[index].id_remitente !== mensajes[index + 1].id_remitente
            ? classes[`${sidePorUsuario(mensaje)}Last`]
            : '';

    const horaMensaje = (utcDatetimeString) => {
        const date = new Date(utcDatetimeString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const fechaMensaje = (utcDatetimeString) => {
        const date = new Date(utcDatetimeString);
        return date.toLocaleDateString();
    };

    const sidePorUsuario = (mensaje) => {
        return mensaje.id_remitente === usuario_id ? 'right' : 'left';
    };

    const handleFecha = (index, mensaje) => {
        return index === 0 ||
            fechaMensaje(mensaje.createdAt) !==
                fechaMensaje(mensajes[index - 1].createdAt) ? (
            <Fragment>
                <Grid item xs={12}>
                    <Divider>
                        <Typography variant="body2" color="textSecondary">
                            {fechaMensaje(mensaje.createdAt)}
                        </Typography>
                    </Divider>
                </Grid>
            </Fragment>
        ) : (
            ''
        );
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setHoveredMessage(null);
    };

    const handleMouseEnter = (index) => {
        setHoveredMessage(index);
    };

    const handleMouseLeave = () => {
        setHoveredMessage(null);
    };

    const handleUpdateClick = (id_mensaje) => {
        const message = mensajes.find((mensaje) => mensaje.id === id_mensaje);
        setEditedMessage(message);
        setOpen(true);
    };

    const handleDeleteClick = (id_mensaje) => {
        setDeleteMessage(id_mensaje);
        setOpenDelete(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setOpenDelete(false);
        handleMenuClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedMessage((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        let objMensaje = {
            id: editedMessage.id,
            texto: editedMessage.texto
        };
        setOpen(false);
        updateMensaje(objMensaje);
        handleDialogClose();
        handleMenuClose();
        mensajes.forEach((mensaje) => {
            if (mensaje.id === objMensaje.id) {
                mensaje.texto = objMensaje.texto;
            }
        });
        socket.emit('message', objMensaje);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        setOpenDelete(false);
        deleteMensaje(deleteMessage);
        handleDialogClose();
        handleMenuClose();
        const index = mensajes.findIndex(
            (mensaje) => mensaje.id === deleteMessage
        );
        mensajes.splice(index, 1);
        socket.emit('message', deleteMessage);
    };

    const [usuarios, setUsuarios] = useState({});

    useEffect(() => {
        const cargarUsuarios = async () => {
            const usuariosCargados = {};
            for (const mensaje of mensajes) {
                if (!usuariosCargados[mensaje.id_remitente]) {
                    try {
                        const usuario = await getUsuario(mensaje.id_remitente);
                        usuariosCargados[mensaje.id_remitente] = usuario;
                    } catch (error) {
                        console.error('Error al obtener el usuario:', error);
                    }
                }
            }
            setUsuarios(usuariosCargados);
        };

        cargarUsuarios();
    }, [mensajes]);

    //Fin getUsuario

    return (
        <Fragment>
            <Grid container>
                {mensajes.map((mensaje, i) => {
                    return (
                        <Fragment key={mensaje.id || i}>
                            {handleFecha(i, mensaje)}
                            {sidePorUsuario(mensaje) === 'left' ? (
                                <Grid key={mensaje.id || i} container item>
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            paddingLeft: 2
                                        }}
                                    >
                                        {primerUltimoMensaje(i, mensaje) ===
                                            classes.leftFirst && (
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: cyan[600],
                                                    fontWeight: 'bold',
                                                    paddingBottom: '0.2rem'
                                                }}
                                            >
                                                {usuarios[
                                                    mensaje.id_remitente
                                                ] ? (
                                                    <>
                                                        {usuarios[
                                                            mensaje.id_remitente
                                                        ].nombre.trim() +
                                                            ' ' +
                                                            usuarios[
                                                                mensaje
                                                                    .id_remitente
                                                            ].apellido.trim()}
                                                        <Typography
                                                            variant="caption"
                                                            color="textSecondary"
                                                            sx={{
                                                                fontSize: '13px'
                                                            }}
                                                        >
                                                            {' - ' +
                                                                usuarios[
                                                                    mensaje
                                                                        .id_remitente
                                                                ].rol[0]
                                                                    .toUpperCase()
                                                                    .trim() +
                                                                usuarios[
                                                                    mensaje
                                                                        .id_remitente
                                                                ].rol
                                                                    .substring(
                                                                        1
                                                                    )
                                                                    .trim()}
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    'Cargando...'
                                                )}
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid container item>
                                        {/*primerUltimoMensaje(i, mensaje) ===
                                            classes.leftFirst && (
                                            <AvatarIcon
                                                info={
                                                    usuarios[
                                                        mensaje.id_remitente
                                                    ]
                                                        ? [
                                                              `${usuarios[
                                                                  mensaje
                                                                      .id_remitente
                                                              ].nombre.trim()} ${usuarios[
                                                                  mensaje
                                                                      .id_remitente
                                                              ].apellido.trim()}`
                                                          ]
                                                        : ['Cargando...']
                                                }
                                            />
                                            )*/}

                                        <Grid
                                            item
                                            xs={9}
                                            display="flex"
                                            justifyContent="flex-start"
                                            sx={{
                                                marginLeft:
                                                    sidePorUsuario(mensaje) ==
                                                    'left'
                                                        ? '0'
                                                        : 'auto',
                                                paddingLeft:
                                                    primerUltimoMensaje(
                                                        i,
                                                        mensaje
                                                    ) === classes.leftFirst
                                                        ? 1
                                                        : 1,
                                                paddingBottom:
                                                    primerUltimoMensaje(
                                                        i,
                                                        mensaje
                                                    ) === classes.leftLast
                                                        ? 2
                                                        : 0
                                            }}
                                        >
                                            <Typography
                                                align={'left'}
                                                className={cx(
                                                    classes.msg,
                                                    classes[
                                                        `${sidePorUsuario(
                                                            mensaje
                                                        )}`
                                                    ],
                                                    primerUltimoMensaje(
                                                        i,
                                                        mensaje
                                                    )
                                                )}
                                            >
                                                {mensaje.texto}
                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                    sx={{
                                                        fontSize: '0.7rem',
                                                        ml: 1
                                                    }}
                                                >
                                                    {horaMensaje(
                                                        mensaje.createdAt
                                                    )}
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid
                                    key={mensaje.id || i}
                                    container
                                    item
                                    justifyContent="flex-end"
                                >
                                    <Grid
                                        item
                                        xs={10}
                                        display="flex"
                                        justifyContent="flex-end"
                                        sx={{
                                            paddingBottom:
                                                primerUltimoMensaje(
                                                    i,
                                                    mensaje
                                                ) === classes.rightLast
                                                    ? 2
                                                    : 0,
                                            position: 'relative'
                                        }}
                                        onMouseEnter={() =>
                                            handleMouseEnter(mensaje.id)
                                        }
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Typography
                                            className={cx(
                                                classes.msg,
                                                classes[
                                                    `${sidePorUsuario(mensaje)}`
                                                ],
                                                primerUltimoMensaje(i, mensaje)
                                            )}
                                        >
                                            {mensaje.texto}
                                            <Typography
                                                variant="caption"
                                                color="#7986cb"
                                                sx={{
                                                    fontSize: '0.7rem',
                                                    ml: 1
                                                }}
                                            >
                                                {horaMensaje(mensaje.createdAt)}
                                            </Typography>
                                            {hoveredMessage === mensaje.id && (
                                                <IconButton
                                                    onClick={(event) =>
                                                        handleMenuOpen(
                                                            event,
                                                            mensaje.id
                                                        )
                                                    }
                                                    sx={{
                                                        padding: 0,
                                                        backgroundColor:
                                                            '#3f51b5',
                                                        visibility: 'visible',
                                                        position: 'absolute',
                                                        right: 4,
                                                        top: 2,
                                                        rounded: '100%',
                                                        '&:hover': {
                                                            backgroundColor:
                                                                '#3f51b5'
                                                        }
                                                    }}
                                                >
                                                    <ExpandMoreIcon />
                                                </IconButton>
                                            )}
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={
                                                    Boolean(anchorEl) &&
                                                    hoveredMessage ===
                                                        mensaje.id
                                                }
                                                onClose={handleMenuClose}
                                                PaperProps={{
                                                    sx: {
                                                        overflow: 'visible',
                                                        mt: -1,
                                                        ml: -1,
                                                        width: 'auto',
                                                        borderRadius: 1,
                                                        boxShadow: 3
                                                    }
                                                }}
                                                transformOrigin={{
                                                    horizontal: 'right',
                                                    vertical: 'bottom'
                                                }}
                                                anchorOrigin={{
                                                    horizontal: 'right',
                                                    vertical: 'top'
                                                }}
                                            >
                                                {Date.now() -
                                                    new Date(
                                                        mensaje.createdAt
                                                    ) <
                                                    900000 && (
                                                    <MenuItem
                                                        onClick={() =>
                                                            handleUpdateClick(
                                                                mensaje.id
                                                            )
                                                        }
                                                    >
                                                        Editar
                                                    </MenuItem>
                                                )}
                                                <MenuItem
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            mensaje.id
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </MenuItem>
                                            </Menu>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}
                        </Fragment>
                    );
                })}
            </Grid>

            {/* Dialog para el boton eliminar */}
            <Dialog
                open={openDelete}
                onClose={handleDialogClose}
                sx={{
                    '& .MuiDialog-paper': {
                        width: '25rem',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '10px',
                        boxShadow: 3
                    }
                }}
            >
                <DialogTitle>¿Estas seguro que quieres eliminar?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancelar</Button>
                    <Button onClick={handleDelete}>Eliminar</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog para el boton editar */}
            <Dialog
                open={open}
                onClose={handleDialogClose}
                sx={{
                    '& .MuiDialog-paper': {
                        width: '25rem',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '10px',
                        boxShadow: 3
                    }
                }}
            >
                <DialogTitle>Edita el mensaje</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="message"
                        name="texto"
                        label="Mensaje"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editedMessage.texto}
                        onChange={handleChange}
                        error={editedMessage.texto === ''}
                        helperText={
                            editedMessage.texto === '' &&
                            'El mensaje no puede estar vacio'
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancelar</Button>
                    <Button
                        onClick={handleUpdate}
                        disabled={editedMessage.texto === ''}
                    >
                        Actualizar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
});

export default Mensajes;
