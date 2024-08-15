import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
        }
    }
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
    };
}

export default function MultipleSelect(props) {
    const { nombresDirectivos, handleChangeDirectivo, listaDirectivos } = props;
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    return (
        <div>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="demo-multiple-name-label">
                    Directivo/s
                </InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={listaDirectivos}
                    onChange={handleChangeDirectivo}
                    input={<OutlinedInput label="Directivos" />}
                    MenuProps={MenuProps}
                >
                    {nombresDirectivos.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
