import React, {useState} from "react";
import {Box, Button, Skeleton, SwipeableDrawer, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {PieChart} from "@mui/x-charts";

import {selectUser} from "../../store/user/selectors.ts";
import {selectCompany} from "../../store/company/selectors.ts";

const UserInfo: React.FC = () => {
    const user = useSelector(selectUser)
    const company = useSelector(selectCompany)

    const [open, setIsOpen] = useState<boolean>(false)

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    if (!user || !company) {
        return (
            <Skeleton variant={'circular'} width="200px" height="47px" sx={{
                borderRadius: '10px',
            }}/>
        );
    }

    const attendanceData = user.records.reduce(
        (acc, record) => {
            const [hours, minutes] = record.time.split(":").map(Number);
            const arrivalTime = hours * 60 + minutes;
            const startTime = company.startWorkHour * 60;

            const delay = arrivalTime - startTime;

            if (delay <= 0) {
                acc.onTime += 1;
            } else if (delay <= company.minorDelay) {
                acc.minorDelay += 1;
            } else {
                acc.severeDelay += 1;
            }

            return acc;
        },
        {onTime: 0, minorDelay: 0, severeDelay: 0}
    );

    const data = [
        {label: "", value: attendanceData.onTime, color: "#4CAF50"},
        {label: "", value: attendanceData.minorDelay, color: "#FFEB3B"},
        {label: "", value: attendanceData.severeDelay, color: "#F44336"},
    ].filter(item => item.value > 0);


    return (
        <>
            <Button onClick={handleOpen} sx={{
                display: "flex",
                alignItems: "center",
                gap: '10px',

                textTransform: 'none',
                color: 'text.primary'
            }}>
                <Box sx={{
                    display: "flex",

                    width: "35px",
                    height: "35px",

                    backgroundColor: "grey",
                    borderRadius: 999,

                    overflow: 'hidden',
                }}>
                    <img src={user.imageUrl} alt=""/>
                </Box>
                <Typography variant={'body1'}>Вітаємо, {user.name}</Typography>
            </Button>

            <SwipeableDrawer
                onOpen={() => {
                }}
                onClose={handleClose}
                anchor={'bottom'}
                open={open}
                sx={{
                    '& .MuiDrawer-paper': {
                        height: "80%",
                        padding: "20px 10px",
                    }
                }}
            >
                <Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: 'column',

                        mb: '30px'
                    }}>
                        <Typography variant={'h4'}>{user.name}</Typography>
                        <Typography variant={'subtitle1'}>{user.telegramId}</Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: 'column',
                    }}>
                        <Typography variant={'body1'} textAlign={'center'}>Статистика за поточний місяць</Typography>
                        <PieChart
                            series={[
                                {
                                    paddingAngle: 2,
                                    innerRadius: 80,
                                    outerRadius: 130,
                                    data,
                                },
                            ]}
                            width={300}
                            height={300}
                            margin={{right: 5}}
                            legend={{hidden: true}}
                        />
                    </Box>
                </Box>
            </SwipeableDrawer>
        </>
    )
}

export default UserInfo