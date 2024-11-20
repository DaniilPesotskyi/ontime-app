import React, {useState} from "react";
import {Box, Button, Skeleton, SwipeableDrawer, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {DefaultizedPieValueType, PieChart} from "@mui/x-charts";

import {selectUser} from "../../store/user/selectors.ts";
import {selectCompany} from "../../store/company/selectors.ts";
import useTelegram from "../../hooks/useTelegram.ts";
import {calculateAttendanceData} from "../../utils/caclulateAttendanceData.ts";
import {
    MAJOR_DELAY_COLOR,
    MINOR_DELAY_COLOR,
    ONTIME_DELAY_COLOR,
    SEVERE_DELAY_COLOR,
    SIGNIFICANT_DELAY_COLOR
} from "../../constants.ts";

const UserInfo: React.FC = () => {
    const user = useSelector(selectUser)
    const company = useSelector(selectCompany)

    const {tgUser} = useTelegram()

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

    const attendanceData = calculateAttendanceData(user.records, company)

    const data = [
        {label: "", value: attendanceData.onTime, color: ONTIME_DELAY_COLOR},
        {label: "", value: attendanceData.minorDelay, color: MINOR_DELAY_COLOR},
        {label: "", value: attendanceData.significantDelay, color: SIGNIFICANT_DELAY_COLOR},
        {label: "", value: attendanceData.majorDelay, color: MAJOR_DELAY_COLOR},
        {label: "", value: attendanceData.severeDelay, color: SEVERE_DELAY_COLOR},
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
                    <img src={tgUser.photo_url} alt=""/>
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
                                    arcLabel: (params: DefaultizedPieValueType) => params.value.toString()
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