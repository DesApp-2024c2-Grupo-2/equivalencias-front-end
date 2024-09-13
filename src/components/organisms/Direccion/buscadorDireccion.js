import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { columns } from '../Direccion/TablaDireccion';

// const materias = [
//     { materia: 'Organizacion de computadoras', year: 1994 },
//     { materia: 'Introduccion a la programacion', year: 1972 },
//     { materia: 'Ingenieria de software', year: 1974 },
//   ];
// const solicitantes = [
//   { solicitante: 'Sebastian Montes de Oca', year: 24 },
//   { solicitante: 'Lautaro', year: 24 },
//   { solicitante: 'Facundo Ferrara', year: 23 },
//     { solicitante: 'Emanuel', year: 30 },
//   ];

export default function FreeSolo() {
    return (
        <Stack
            spacing={2}
            sx={{ width: 300 }}
            mt={{ xs: '10px' }}
            marginLeft={{ xs: '57px' }}
        >
            {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={solicitantes.map((option) => option.solicitante)}
        renderInput={(params) => <TextField {...params} label="Buscar Solicitud" />}
      /> */}
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={columns.map((option) => option.id)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Buscar Solicitud"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search'
                        }}
                    />
                )}
            />
        </Stack>
    );
}
