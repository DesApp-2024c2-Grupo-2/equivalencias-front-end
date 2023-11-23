import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightRegular
    };
}

export default function MultipleSelectEdit(props) {
    const { listaDirectivos, personName, setPersonName, dirId, setDirId } =
        props;
    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        const selectedNames = value.map(
            (selected) => selected.nombre + ' ' + selected.apellido
        );
        console.log('value', value);
        setPersonName(selectedNames);
        console.log(selectedNames);
        const selectedIds = value.map((selected) => selected.id);
        setDirId(selectedIds);
    };

    useEffect(() => {
        console.log('personame', personName);
        console.log(dirId);
    }, [personName, dirId]);

    const directivos = listaDirectivos.map((dir) => {
        return {
            id: dir.id,
            nombre: dir.nombre,
            apellido: dir.apellido
        };
    });

    return (
        <div>
            <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
                <InputLabel id="demo-multiple-name-label">
                    Directivo/s
                </InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={
                        personName.length > 0
                            ? personName.map((name) =>
                                  directivos.find(
                                      (dir) =>
                                          name ===
                                          dir.nombre + ' ' + dir.apellido
                                  )
                              )
                            : personName
                    }
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {directivos.map((dir) => (
                        <MenuItem
                            key={dir.id}
                            value={dir}
                            style={getStyles(dir, personName, theme)}
                        >
                            {dir.nombre + ' ' + dir.apellido}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
