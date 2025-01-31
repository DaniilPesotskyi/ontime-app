import React, {memo, useState} from "react";
import {
    Avatar, Box,
    Collapse, Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";

import {IUser} from "../../types/userTypes.ts";

import {selectCompany} from "../../store/company/selectors.ts";

interface IProps {
    user: IUser
}

const UserItem: React.FC<IProps> = ({user}) => {
    const company = useSelector(selectCompany);

    const [isOpen, setIsOpen] = useState(false)

    function calculateDelay(time: string, startHour: number) {
        const [hours, minutes] = time.split(":").map(Number);
        const arrivalTime = hours * 60 + minutes;
        const startTime = startHour * 60;
        return Math.max(arrivalTime - startTime, 0);
    }

    const getRecordData = (record: IUser['records'][number]) => {
        if (!company) {
            return
        }

        const delay = calculateDelay(record.time, company.startWorkHour);

        let backgroundColor = "#FFFFFF"; // Default white
        let fontColor = "#000000"; // Default black
        let formattedDelay = '00:00'

        if (delay > company.minorDelay) {
            const hours = Math.floor(delay / 60);
            const minutes = delay % 60;
            formattedDelay = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

            if (delay > company.minorDelay && delay <= company.significantDelay) {
                backgroundColor = "#F1C48D"; // Significant delay
            } else if (delay > company.significantDelay && delay <= company.majorDelay) {
                backgroundColor = "#F18D8D"; // Major delay
                fontColor = "#FFFFFF"; // White font
            } else if (delay > company.majorDelay) {
                backgroundColor = "#8E0000"; // Critical delay
                fontColor = "#FFFFFF"; // White font
            }
        }
        return {
            fontColor,
            backgroundColor,
            formattedDelay,
        }
    }

    return (
        <>
            <ListItemButton
                onClick={() => setIsOpen(!isOpen)}

                sx={{
                    position: "sticky",
                    top: 0,
                    left: 0,

                    backgroundColor: "background.default",

                    zIndex: 2,

                    '&:hover': {
                        backgroundColor: "background.default",
                    }
                }}
            >
                <ListItemAvatar>
                    <Avatar/>
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={user.id}/>
            </ListItemButton>
            <Collapse in={isOpen} unmountOnExit>
                <List>
                    {user.records.slice().reverse().map((record) => {
                        const recordData = getRecordData(record);

                        return (
                            <>
                                <ListItem
                                    key={record.day}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",

                                        backgroundColor: recordData?.backgroundColor,
                                    }}
                                >
                                    <Typography color={recordData?.fontColor}>
                                        {record.day}
                                    </Typography>
                                    <Box
                                        sx={{
                                            p: 1,

                                            borderRadius: 1,

                                            color: recordData?.fontColor
                                        }}
                                    >
                                        {recordData?.formattedDelay}
                                    </Box>
                                </ListItem>
                                <Divider/>
                            </>
                        )
                    })}
                </List>
            </Collapse>
        </>
    )
}

export default memo(UserItem);