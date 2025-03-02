import React from "react";
import {Box} from "@mui/material";
import {IRecord} from "../../../../types/record";

interface IProps {
    date?: string | number
    isToday?: boolean
    record?: IRecord
}

const Day: React.FC<IProps> = ({date, isToday}) => {
    return (
        <Box
            sx={{
                backgroundColor: "white",

                border: isToday ? '2px solid red' : '',
                borderRadius: 1,
            }}
        >
            {date}
        </Box>
    )
}

export default Day