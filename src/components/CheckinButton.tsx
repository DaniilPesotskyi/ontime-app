import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Collapse, IconButton, Snackbar} from "@mui/material";
import {addRecordThunk} from "../store/user/thunks.ts";
import {IButtonStatus} from "../types/statusType.ts";
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {useSelector} from "react-redux";
import {selectUser} from "../store/user/selectors.ts";
import {selectHasAccess} from "../store/workspace/selectors.ts";
import {green, grey, orange, red} from "@mui/material/colors";
import isLate from "../utils/isLate.ts";
import {IRecord} from "../types/recordsTypes.ts";
import {HomeOutlined} from "@mui/icons-material";
import {selectCompany} from "../store/company/selectors.ts";
import ReasonDrawer from "./ReasonDrawer.tsx";

const CheckinButton: React.FC = () => {
    const dispatch = useAppDispatch();

    const user = useSelector(selectUser)
    const company = useSelector(selectCompany)
    const hasAccess = useSelector(selectHasAccess)

    const [status, setStatus] = useState<IButtonStatus>('load')
    const [snackbarMessage, setSnackbarMessage] = useState<string>('')
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

    const currentDay = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const alreadyChecked = user && user.records.some((r) => r.day === currentDay)

    // Статус кнопки
    useEffect(() => {
        if (!user) {
            return
        }
        if (!hasAccess) {
            setStatus('unavailable')
            return;
        }
        if (alreadyChecked) {
            setStatus('checkedIn')
            return;
        }
        setStatus('noCheckedIn')
    }, [user, hasAccess]);

    // BUTTON`S TEXT & COLOR
    const buttonSettings = () => {
        if (status === 'load') {
            return {
                text: '',
                color: grey['400']
            }
        }
        if (status === 'unavailable') {
            return {
                text: 'Неможливо',
                color: red['400']
            }
        }
        if (company && status === 'noCheckedIn' && isLate(company.startWorkHour)) {
            return {
                text: 'Відмітитись із запізненням',
                color: orange['400']
            }
        } else if (status === 'noCheckedIn') {
            return {
                text: 'Відмітитись',
                color: orange['400']
            }
        }

        if (status === 'checkedIn') {
            return {
                text: 'Вже відмітились',
                color: green['400']
            }
        }

        return {
            text: 'ERROR',
            color: 'red'
        }

    }

    // CLICK
    const handleCheckinButtonClick = async (type: IRecord['type']) => {
        if (!user && !company) {
            return
        }
        if (status === 'unavailable') {
            setSnackbarMessage('Не є можливим')
            return
        }
        if (alreadyChecked) {
            setSnackbarMessage('Вже відмітились')
            return
        }

        if (company && isLate(company.startWorkHour)) {
            if (type === 'onsite') {
                setIsDrawerOpen(true)
            } else {
                await dispatch(addRecordThunk({
                    type: type,
                    day: currentDay,
                    time: currentTime,
                    reason: ''
                }));
            }
        } else {
            await dispatch(addRecordThunk({
                type: type,
                day: currentDay,
                time: currentTime,
                reason: ''
            }));
            setSnackbarMessage('Відмітка успішна');
        }


    }

    return (
        <>
            <Button
                onClick={() => handleCheckinButtonClick('onsite')}
                variant={'contained'} sx={{
                width: '220px',
                height: '220px',

                borderRadius: "50%",
                backgroundColor: buttonSettings().color,
            }}>
                {status === 'load' && (
                    <CircularProgress size={60}/>
                )}
                {buttonSettings().text}
            </Button>
            <Collapse in={status === 'noCheckedIn' || status === 'lateCheckIn'}>
                <IconButton onClick={() => handleCheckinButtonClick('remote')}>
                    <HomeOutlined/>
                </IconButton>
            </Collapse>
            <Snackbar
                open={snackbarMessage.length > 0}
                autoHideDuration={1000}
                onClose={() => setSnackbarMessage('')}
                message={snackbarMessage}
            />
            <ReasonDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </>
    )
}

export default CheckinButton