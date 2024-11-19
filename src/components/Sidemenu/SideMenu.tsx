import React from "react";
import {Box, IconButton, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Typography} from "@mui/material";
import {AssignmentLateOutlined, Close, VpnLockOutlined, WatchLaterOutlined} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {selectCompany} from "../../store/company/selectors.ts";
import UserItem from "./UserItem.tsx";
import {IUser} from "../../types/userTypes.ts";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideMenu: React.FC<IProps> = ({isOpen, onClose}) => {
    const company = useSelector(selectCompany)

    if (!company) {
        return (
            <Box></Box>
        )
    }

    return (
        <SwipeableDrawer
            onOpen={() => {
            }}
            onClose={onClose}
            anchor={'left'}
            open={isOpen}
            sx={{
                '& .MuiDrawer-paper': {
                    width: "100%",
                    padding: "20px 10px",
                }
            }}
        >
            <Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",

                    height: "50px",
                }}>
                    <Typography variant={'h5'} fontWeight={'bold'}>{company?.title}</Typography>
                    <IconButton onClick={onClose}>
                        <Close/>
                    </IconButton>
                </Box>
            </Box>
            <Typography variant={'subtitle1'}>Налаштування</Typography>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <VpnLockOutlined/>
                    </ListItemIcon>
                    <ListItemText primary="IP:"/>
                    {company.ip}
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <WatchLaterOutlined/>
                    </ListItemIcon>
                    <ListItemText primary="Початок робочого дня:"/>
                    {company.startWorkHour}:00
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <AssignmentLateOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Незначне запізнення:'}/>
                    {company.minorDelay} хв
                </ListItem>
            </List>
            <Typography variant={'subtitle1'}>Користувачі</Typography>
            <List>
                {company.users.map((user: Omit<IUser, 'records'>) => (
                    <UserItem user={user}/>
                ))}
            </List>
        </SwipeableDrawer>
    )
}

export default SideMenu