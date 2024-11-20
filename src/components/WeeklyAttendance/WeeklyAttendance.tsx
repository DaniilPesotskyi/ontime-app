import React from "react";
import {useSelector} from "react-redux";
import {Box} from "@mui/material";

import useTelegram from "../../hooks/useTelegram.ts";

import {selectUser} from "../../store/user/selectors.ts";
import {selectCompany} from "../../store/company/selectors.ts";

import {
    MAJOR_DELAY_COLOR,
    MINOR_DELAY_COLOR,
    ONTIME_DELAY_COLOR,
    SEVERE_DELAY_COLOR,
    SIGNIFICANT_DELAY_COLOR
} from "../../constants.ts";

// Основной компонент
const WeeklyAttendance: React.FC = () => {
    const {tg} = useTelegram();

    const user = useSelector(selectUser)
    const company = useSelector(selectCompany)

    if (!user || !company) return

    const getCurrentWeekDays = () => {
        const now = new Date();
        const start = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Понедельник
        return Array.from({length: 7}, (_, i) => {
            const date = new Date(start);
            date.setDate(start.getDate() + i);
            return date.toISOString().split("T")[0];
        });
    };

    const weekDays = getCurrentWeekDays();

    const weeklyAttendance = weekDays.map((day) => {
        const record = user.records.find((r) => r.day === day)

        // for day off
        const dayOfWeek = new Date(day).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return {date: day, color: "rgba(160,255,160,0.17)"};
        }

        if (!record) {
            return {date: day, color: tg.themeParams.secondary_bg_color};
        }

        const [hours, minutes] = record.time.split(":").map(Number);

        const arrivalTime = hours * 60 + minutes;
        const startTime = company.startWorkHour * 60;
        const delay = arrivalTime - startTime;

        // on time
        if (delay === null || delay <= 0) return {date: day, color: ONTIME_DELAY_COLOR};
        // minor delay
        if (delay > 0 && delay <= company.minorDelay) return {date: day, color: MINOR_DELAY_COLOR};
        // significant delay
        if (delay > company.minorDelay && delay <= company.significantDelay)
            return {date: day, color: SIGNIFICANT_DELAY_COLOR};
        // major delay
        if (delay > company.significantDelay && delay <= company.majorDelay)
            return {date: day, color: MAJOR_DELAY_COLOR};
        // severe delay
        return {date: day, color: SEVERE_DELAY_COLOR};
    });

    return (
        <Box sx={{
            display: "grid",
            width: "60%",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "10px",
        }}>
            {weeklyAttendance.map(({date, color}) => (
                <Box
                    key={date}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        height: "10px",

                        backgroundColor: color,
                        borderRadius: "5px",
                    }}
                >
                    {/*{new Date(date).getDate()}*/}
                </Box>
            ))}
        </Box>
    );
};

export default WeeklyAttendance;
