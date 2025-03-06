import React, { useRef, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

const CODE_LENGTH = 5;

interface IProps {
    onSubmit: (value: string) => void;
}

const CodeInput: React.FC<IProps> = ({onSubmit}) => {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));

    const handleCodeChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < CODE_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newCode.every((char) => char !== "")) {
            handleSubmit(newCode.join(""));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const newCode = [...code];

            if (code[index]) {
                newCode[index] = "";
            } else if (index > 0) {
                newCode[index - 1] = "";
                inputRefs.current[index - 1]?.focus();
            }

            setCode(newCode);
        }
    };

    const handleSubmit = async (finalCode: string) => {
        onSubmit(finalCode)
    };

    return (
        <Box>
            <Typography variant="h5" textAlign="center" marginBottom={2}>
                Код компанії
            </Typography>
            <Box display="flex" gap={1} justifyContent="center">
                {code.map((_, index) => (
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
                            style: { textAlign: "center" },
                        }}
                        sx={{
                            width: "50px",
                            "& input": { fontSize: "24px", textAlign: "center" },
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default CodeInput;
