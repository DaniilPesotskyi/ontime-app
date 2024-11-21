import React from "react";
import {Box, Chip, ListItem, Typography} from "@mui/material";

import {IUser} from "../../types/userTypes.ts";

import useTelegram from "../../hooks/useTelegram.ts";


interface IProps {
    user: Omit<IUser, "records">;
}

const UserItem: React.FC<IProps> = ({user}) => {
    const {tg, tgUser} = useTelegram()

    return (
        <ListItem sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            borderRadius: '10px',
            backgroundColor: tg.themeParams.secondary_bg_color,
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: '10px',
            }}>
                <Box sx={{
                    width: "40px",
                    height: "40px",

                    borderRadius: '4px',
                    backgroundColor: "grey",
                }}></Box>
                <Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: '10px'
                    }}>
                        <Typography variant={'body1'}>{user.name}</Typography>
                        {user.telegramId === tgUser.id && <Chip label={'Ви'} color={'info'} size={'small'}/>}
                    </Box>
                    <Typography variant={'body2'}>{user.id} | {user.role}</Typography>
                </Box>
            </Box>

            {/*{currentUser?.role === 'admin' && (*/}
            {/*    <Button>*/}
            {/*        Delete*/}
            {/*    </Button>*/}
            {/*)}*/}
        </ListItem>
    )
}

export default UserItem