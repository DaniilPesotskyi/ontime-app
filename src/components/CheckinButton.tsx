import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Snackbar} from "@mui/material";
import {addRecordThunk} from "../store/user/thunks.ts";
import {IButtonStatus} from "../types/statusType.ts";
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {useSelector} from "react-redux";
import {selectUser} from "../store/user/selectors.ts";
import {selectHasAccess} from "../store/workspace/selectors.ts";
import {green, grey, orange, red} from "@mui/material/colors";
import isLate from "../utils/isLate.ts";

const CheckinButton: React.FC = () => {
    const dispatch = useAppDispatch();

    const user = useSelector(selectUser)
    const hasAccess = useSelector(selectHasAccess)

    const [status, setStatus] = useState<IButtonStatus>('load')
    const [snackbarMessage, setSnackbarMessage] = useState<string>('')

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
        if (status === 'noCheckedIn' && isLate()) {
            return {
                text: 'Відмітитись із запізненням',
                color: orange['400']
            }
        } else if(status === 'noCheckedIn') {
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
    const handleCheckinButtonClick = async () => {
        if (!user) {
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
        await dispatch(addRecordThunk({
            type: "onsite",
            day: currentDay,
            time: currentTime,
            reason: "Regular check-in"
        }));
        setSnackbarMessage('Відмітка успішна');
    }

    return (
        <>
            <Button
                onClick={handleCheckinButtonClick}
                variant={'contained'} sx={{
                width: '280px',
                height: '280px',

                borderRadius: "50%",
                backgroundColor: buttonSettings().color,
            }}>
                {status === 'load' && (
                    <CircularProgress size={60}/>
                )}
                {buttonSettings().text}
            </Button>
            <Snackbar
                open={snackbarMessage.length > 0}
                autoHideDuration={1000}
                onClose={() => setSnackbarMessage('')}
                message={snackbarMessage}
            />
        </>
    )
}

export default CheckinButton