import React from 'react';
import Switch from '@mui/material/Switch';
import { updateEstadoUsuarioByDni } from '../../../services/usuario_service';
import { useEffect } from 'react';
import { getUsuarioEstado } from '../../../services/usuario_service';

function SwitchHabilitarUsuario({ dniUsuario, page, buscador, rol }) {
    const [checked, setChecked] = React.useState(null);
    const [update, setUpdate] = React.useState(false);

    const handleChangeCheck = (event) => {
        setChecked(event.target.checked);
        setUpdate(true);
    };

    useEffect(() => {
        if (update) {
            const nuevoEstado = checked ? 'Habilitado' : 'Deshabilitado';
            updateEstadoUsuarioByDni(dniUsuario, nuevoEstado);
            setUpdate(false);
        }
    }, [update]);

    useEffect(() => {
        const fetchEstadoUsuario = async () => {
            const est = await getUsuarioEstado(dniUsuario);
            setChecked(est.estado === 'Habilitado');
        };

        fetchEstadoUsuario();
    }, [page, buscador, rol]);

    return (
        <>
            <Switch checked={checked} onChange={handleChangeCheck} />
            Habilitado
        </>
    );
}

export default SwitchHabilitarUsuario;
