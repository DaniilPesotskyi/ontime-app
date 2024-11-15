import React, {useRef, useState} from "react";
import {Box, TextField, Typography} from "@mui/material";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {useSelector} from "react-redux";
import {selectCompanyError} from "../../store/company/selectors.ts";
import {fetchCompanyByRequestIdThunk} from "../../store/company/thunks.ts";

const CompanyCode: React.FC = () => {
    const dispatch = useAppDispatch();
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [code, setCode] = useState<string[]>(Array(5).fill(""));

    const error = useSelector(selectCompanyError)

    const handleCodeChange = (index: number, value: string) => {
        if (!/^[0-9]$/.test(value) && value !== "") return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        } else if (!value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (newCode.every((char) => char !== "")) {
            handleSubmit(newCode.join(""));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && code[index] === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (finalCode: string) => {
        try {
            await dispatch(fetchCompanyByRequestIdThunk(finalCode))
        } catch (error) {
            console.error(error);
        } finally {
            setCode(['', '', '', '', ''])
            inputRefs.current[0]?.focus();
        }
    };


    return (
        <Box>
            <Typography variant="h5" textAlign={'center'} marginBottom={'16px'}>Код компанії</Typography>
            <Box display="flex" gap="10px" justifyContent="center">
                {[...Array(5)].map((_, index) => (
                    <TextField
                        key={index}
                        inputRef={(el) => (inputRefs.current[index] = el)}
                        variant="outlined"
                        type="number"
                        value={code[index]}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        inputProps={{
                            maxLength: 1,
                            style: {textAlign: "center"},
                        }}
                        sx={{
                            width: "50px",
                            '& input[type=number]': {
                                MozAppearance: 'textfield',
                                appearance: 'textfield',
                            },
                            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                            },
                        }}
                    />
                ))}
            </Box>
            {error &&
                <Typography textAlign={'center'} variant={'body1'} color={'error'}>{error}</Typography>}
        </Box>
    )
}

export default CompanyCode;