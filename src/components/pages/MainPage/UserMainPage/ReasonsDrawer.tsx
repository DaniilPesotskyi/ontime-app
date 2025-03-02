import React from "react";

import {Box, Button, Divider, Drawer, Stack} from "@mui/material";
import {orange} from "@mui/material/colors";
import {CampaignOutlined, CommuteOutlined, RocketLaunch} from "@mui/icons-material";

import {IRecord} from "../../../../types/record";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onCheck: (type: IRecord['type'], reason?: IRecord['reason']) => void;
}

const ReasonsDrawer: React.FC<IProps> = ({isOpen, onClose, onCheck}) => {
    return (
        <Drawer open={isOpen} onClose={onClose} anchor={'bottom'}>
            <Box sx={{
                p: 1,
            }}>
                <Button
                    variant={'contained'}
                    sx={{
                        width: '100%',
                        height: '60px',

                        backgroundColor: orange[400],
                    }}

                    onClick={() => onCheck('onsite', '')}
                >
                    ВІДМІТИТИСЬ БЕЗ ПРИЧИНИ
                </Button>
                <Divider
                    sx={{
                        my: 1,
                        color: 'grey'
                    }}>
                    Відмітка з причиною
                </Divider>
                <Stack direction={'column'} gap={1}>
                    <Button
                        startIcon={<CommuteOutlined/>}
                        variant={'text'}
                        onClick={() => onCheck('onsite', 'Затори')}
                    >
                        Затори
                    </Button>
                    <Button
                        startIcon={<RocketLaunch/>}
                        variant={'text'}
                        onClick={() => onCheck('onsite', 'Обстріл')}
                    >
                        Обстріл
                    </Button>
                    <Button
                        startIcon={<CampaignOutlined/>}
                        variant={'text'}
                        onClick={() => onCheck('onsite', 'Форс-мажор в офісі')}
                    >
                        Форс-мажор в офісі
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    )
}

export default ReasonsDrawer