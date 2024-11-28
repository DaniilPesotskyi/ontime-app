import React from "react";
import {Box, Button, Divider, Drawer, Stack} from "@mui/material";
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {addRecordThunk} from "../store/user/thunks.ts";
import {orange} from "@mui/material/colors";
import {CampaignOutlined, CommuteOutlined, RocketLaunch} from "@mui/icons-material";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReasonDrawer: React.FC<IProps> = ({isOpen, onClose}) => {
    const dispatch = useAppDispatch();

    const currentDay = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    const checkinWithReason = (reason: string) => {
        dispatch(addRecordThunk({
            type: 'onsite',
            day: currentDay,
            time: currentTime,
            reason: reason
        }));

        onClose();
    }

    const checkin = () => {
        dispatch(addRecordThunk({
            type: 'onsite',
            day: currentDay,
            time: currentTime,
            reason: ''
        }));

        onClose();
    }

    return (
        <Drawer open={isOpen} onClose={onClose} anchor={'bottom'}>
            <Box sx={{
                p: '20px 20px 40px 20px'
            }}>
                <Button
                    onClick={checkin}
                    variant={'contained'}
                    sx={{
                        width: '100%',
                        height: '60px',

                        backgroundColor: orange[400],
                    }}
                >ВІДМІТИТИСЬ
                </Button>
                <Divider sx={{
                    m: '20px 0',
                    color: 'gray',
                }}>Відмітка з причиною</Divider>
                <Stack direction={'column'} gap={'20px'}>
                    <Button
                        startIcon={<CommuteOutlined/>}
                        variant={'text'}
                        onClick={() => checkinWithReason('Затори')}>
                        Затори
                    </Button>
                    <Button
                        startIcon={<RocketLaunch/>}
                        variant={'text'}
                        onClick={() => checkinWithReason('Обстріл')}>
                        Обстріл
                    </Button>
                    <Button
                        startIcon={<CampaignOutlined/>}
                        variant={'text'}
                        onClick={() => checkinWithReason('Форс-мажор в офісі')}>
                        Форс-мажор в офісі
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    )
}

export default ReasonDrawer;