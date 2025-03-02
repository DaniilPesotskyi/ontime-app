import React, {useMemo, useState} from "react";
import {Box, IconButton, SxProps, Typography} from "@mui/material";
import {KeyboardArrowLeftRounded, KeyboardArrowRightRounded} from "@mui/icons-material";
import {green} from "@mui/material/colors";

import Day from "./Day.tsx";

interface IProps {
    // data: IRecord[];
}

const daysOfWeek = [
    {
        label: 'Пн',
        weekend: false
    },
    {
        label: 'Вт',
        weekend: false
    },
    {
        label: 'Ср',
        weekend: false
    },
    {
        label: 'Чт',
        weekend: false
    },
    {
        label: 'Пт',
        weekend: false
    },
    {
        label: 'Сб',
        weekend: true
    },
    {
        label: 'Вс',
        weekend: true
    },
]

const rowStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',

    borderRadius: 2,

    overflow: 'hidden',
}

const AttendanceCalendar: React.FC<IProps> = ({}) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleMonthChange = (offset: number) => {
        setCurrentDate((prevDate) =>
            new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1)
        );
    };

    const getMonthDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const today = new Date();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const days: (null | { date: Date; isToday: boolean; isBeforeToday: boolean })[] =
            Array(firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1).fill(null);

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const day = new Date(year, month, i);
            days.push({
                date: day,
                isToday: day.toDateString() === today.toDateString(),
                isBeforeToday: day.getTime() < today.getTime() && day.toDateString() !== today.toDateString(),
            });
        }

        return days;
    }, [currentDate]);

    const getMonthName = (number: number): string => {
        switch (number) {
            case 1:
                return "Січень";
            case 2:
                return "Лютий";
            case 3:
                return "Березень";
            case 4:
                return "Квітень";
            case 5:
                return "Травень";
            case 6:
                return "Червень";
            case 7:
                return "Липень";
            case 8:
                return "Серпень";
            case 9:
                return "Вересень";
            case 10:
                return "Жовтень";
            case 11:
                return "Листопад";
            case 12:
                return "Грудень";
            default:
                return "";
        }
    };

    return (
        <Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <IconButton onClick={() => handleMonthChange(-1)}>
                    <KeyboardArrowLeftRounded/>
                </IconButton>
                <Typography fontSize={20}>{getMonthName(currentDate.getMonth() + 1)}</Typography>
                <IconButton onClick={() => handleMonthChange(1)}>
                    <KeyboardArrowRightRounded/>
                </IconButton>
            </Box>

            <Box component="table" sx={{
                width: "100%",
            }}>
                <Box component="thead">
                    <Box component={'tr'} sx={rowStyles}>
                        {daysOfWeek.map((day) => (
                            <Box
                                component={'th'}
                                key={day.label}
                                sx={{
                                    backgroundColor: day.weekend ? green[100] : 'transparent'
                                }}
                            >
                                {day.label}
                            </Box>
                        ))}
                    </Box>
                </Box>
                <tbody>
                {Array.from({length: Math.ceil(getMonthDays.length / 7)}, (_, rowIndex) => (
                    <Box component={'tr'} sx={rowStyles} key={rowIndex}>
                        {getMonthDays.slice(rowIndex * 7, rowIndex * 7 + 7).map((day, colIndex) => (
                            <td key={colIndex} style={{padding: "8px", textAlign: "center"}}>
                                <Day date={day ? day.date.getDate() : ""} isToday={day?.isToday}/>
                            </td>
                        ))}
                    </Box>
                ))}
                </tbody>
            </Box>
        </Box>
    )
}

export default AttendanceCalendar