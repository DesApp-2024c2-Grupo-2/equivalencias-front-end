import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const TablaResultadosMateria = ({ materiasAprobadas }) => {
    console.log(materiasAprobadas);

    const data = materiasAprobadas
        .map((item) => {
            return {
                nombre_materia: item.nombre_materia,
                carreraOrigen: item.carreraOrigen,
                updatedAt: item.updatedAt,
                Equivalencium: {
                    estado: item.Equivalencium.estado,
                    instituto: item.Equivalencium.instituto,
                    Materia_solicitadas:
                        item.Equivalencium.Materia_solicitadas.map(
                            (materia) => {
                                return {
                                    nombre: materia.nombre,
                                    estado: materia.estado,
                                    carrera: materia.carrera
                                };
                            }
                        )
                }
            };
        })
        .filter((mat) => mat.Equivalencium.estado == 'Cerrado');

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Materia aprobada</TableCell>
                        <TableCell>Carrera Origen</TableCell>
                        <TableCell>Última actualización</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <Row key={index} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const Row = ({ row }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.nombre_materia}
                </TableCell>
                <TableCell>{row.carreraOrigen}</TableCell>
                <TableCell>{row.updatedAt}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Detalles
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Materia solicitada
                                        </TableCell>
                                        <TableCell>Estado</TableCell>
                                        <TableCell>Carrera</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.Equivalencium.Materia_solicitadas.map(
                                        (detalle, index) => (
                                            <TableRow key={index}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {detalle.nombre}
                                                </TableCell>
                                                <TableCell>
                                                    {detalle.estado}
                                                </TableCell>
                                                <TableCell>
                                                    {detalle.carrera}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default TablaResultadosMateria;
