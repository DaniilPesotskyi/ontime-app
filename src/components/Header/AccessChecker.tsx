import React, {useState} from "react";

import {AdjustRounded} from "@mui/icons-material";
import {Box, IconButton, Menu, Typography} from "@mui/material";
import {useSelector} from "react-redux";

import {selectHasAccess, selectIp} from "../../store/workspace/selectors.ts";
import {green, red} from "@mui/material/colors";

const AccessChecker: React.FC = () => {
    const hasAccess = useSelector(selectHasAccess)
    const ip = useSelector(selectIp)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const accessStatus = hasAccess ? '' : '(без доступу)'

    return (
        <>
            <IconButton onClick={handleClick}>
                <AdjustRounded sx={{
                    fill: hasAccess ? green['700'] : red['700']
                }}/>
            </IconButton>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleClose}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",

                    padding: "0 26px",
                }}>
                    <Typography variant={'body2'} color={'textSecondary'}>
                        Ваш ip {accessStatus}
                    </Typography>
                    <Typography variant={'h6'} fontSize={'20px'} color={hasAccess ? green['700'] : red['700']}>
                        {ip}
                    </Typography>
                </Box>
            </Menu>
        </>
    )
}

export default AccessChecker;