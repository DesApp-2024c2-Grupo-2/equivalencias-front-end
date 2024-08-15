import { Grid, TextField, styled, Autocomplete } from '@mui/material';
import { css } from '@mui/styled-engine';

const InputMUI = styled(TextField)`
    outline: 1px;
    border: 0;
    width: 400px;
    height: 54px;
`;

const ContenedorInputs = styled(Grid)`
    display: flex;
    width: 75%;
    margin: 0 auto;
    padding: 6px 0px 0px 30px;
`;

const StandardInput = styled(TextField)`
    display: flex;
    margin:0 auto
    outline: 0px;
    border: 0;
    width: 100%;
    margin-top: 15px;

    ${(props) =>
        props.inputFocused &&
        css`
            .MuiOutlinedInput-root {
                &.Mui-focused fieldset {
                    border-color: rgba(0, 0, 0, 0.6);
                    border-width: 1px;
                }
            }

            .MuiInputLabel-root {
                &.Mui-focused {
                    color: rgba(0, 0, 0, 0.6);
                }
            }
        `}

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }

    input[type='number'] {
        -moz-appearance: textfield;
    }
`;

const AutocompleteInput = styled(Autocomplete)`
    outline: 0px;
    border: 0;
    width: 100%;
    margin-top: 15px;
`;

const FileUploader = styled(TextField)`
    width: 80%;
    min-width: 212px;

    input[type='file']::file-selector-button {
        display: none;
    }
`;

export {
    InputMUI,
    ContenedorInputs,
    StandardInput,
    FileUploader,
    AutocompleteInput
};
