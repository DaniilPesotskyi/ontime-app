import React from "react";
import {SxProps, Typography} from "@mui/material";

interface IProps {
    children: React.ReactNode;
    sx?: SxProps
}

const PageDescription: React.FC<IProps> = ({children, sx}) => {

    return (
        <Typography
            variant={'subtitle1'}
            textAlign={'center'}
            color={'textSecondary'}
            sx={{
                mb: 2,
                ...sx
            }}
        >
            {children}
        </Typography>
    )
}

export default PageDescription;