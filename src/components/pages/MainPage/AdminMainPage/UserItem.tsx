import React from "react";

import {IUser} from "../../../../types/user";
import {useRecordsByPeriod} from "../../../../hooks/records/useRecordsByPeriod.ts";
import {useCompany} from "../../../../hooks/company/useCompany.ts";
import {Box, Divider, Typography} from "@mui/material";
import {calculateDelay} from "../../../../utils/calculateDelay.ts";
import {IRecord} from "../../../../types/record";
import {formatMinutes} from "../../../../utils/formatMinutes.ts";
import {getDelayColor} from "../../../../utils/getDelayColor.ts";
import {ICompany} from "../../../../types/company";
import {HomeOutlined} from "@mui/icons-material";


interface IProps {
    user: IUser
}

const RecordBox: React.FC<{ record?: IRecord, company?: ICompany }> = ({record, company}) => {
    if (!record) {
        return <Typography color={'error'}>Відсутній</Typography>
    }

    const delay = calculateDelay(record.time, company ? company.startWorkHour : 9)

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
            }}
        >
            {delay === 0 ? (
                <Typography color={'success'}>Вчасно</Typography>
            ) : (
                <Typography
                    sx={{
                        backgroundColor: company && getDelayColor(company, delay),
                    }}
                >
                    {formatMinutes(delay)}
                </Typography>
            )}
            {record.type === 'remote' && (
                <HomeOutlined
                    sx={{
                        fill: '#2788ff',
                    }}
                />
            )}
        </Box>
    )
}


const UserItem: React.FC<IProps> = ({user}) => {
    const {data: company} = useCompany();

    const currentDay = new Date().toLocaleDateString("en-US")

    const {data: records} = useRecordsByPeriod(company ? company.id : '', user.id, currentDay, currentDay)
    const record = records?.[0];

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography>{user.name}</Typography>
                {user.role !== 'user' ? (
                    <Typography>Адміністратор</Typography>
                ) : (
                    <RecordBox record={record} company={company}/>
                )}
            </Box>
            <Divider sx={{my: 1}}/>
        </>
    )
}

export default UserItem