import React from "react";
import {Box, CircularProgress, Divider, Typography} from "@mui/material";
import {green, red} from "@mui/material/colors";

import {ICompany} from "../../../../types/company";
import {IUser} from "../../../../types/user";
import {IRecord} from "../../../../types/record";

import {useRecordsByPeriod} from "../../../../hooks/records/useRecordsByPeriod.ts";
import {useCompany} from "../../../../hooks/company/useCompany.ts";

import {calculateDelay} from "../../../../utils/calculateDelay.ts";
import {formatMinutes} from "../../../../utils/formatMinutes.ts";
import {getDelayColor} from "../../../../utils/getDelayColor.ts";

interface RecordBoxProps {
    record?: IRecord;
    company: ICompany;
}

const errorTypographyStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    height: '100%',

    borderRadius: 1,
    backgroundColor: red['50'],

    color: red['900'],
    textAlign: "center",
};

const RecordBox: React.FC<RecordBoxProps> = ({record, company}) => {
    if (!record) {
        return (
            <Typography sx={errorTypographyStyle}>
                Відсутній
            </Typography>
        );
    }

    const delay = calculateDelay(record.time, company.startWorkHour);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,

                height: "100%",

                borderLeft: delay === 0 ? undefined : '18px solid',
                borderColor: getDelayColor(company, delay),
                borderRadius: 1,
                backgroundColor: delay === 0 ? green['50'] : red['50'],

                textAlign: "center",
            }}
        >
            {delay === 0 ? (
                <Typography color={green['900']}>Вчасно</Typography>
            ) : (
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <Typography>{formatMinutes(delay)}</Typography>
                </Box>
            )}
            {record.type === 'remote' && (
                <Typography color="info">(R)</Typography>
            )}
        </Box>
    );
};

interface UserItemProps {
    user: IUser;
}

const UserItem: React.FC<UserItemProps> = ({user}) => {
    const {data: company, isLoading: companyLoading} = useCompany();

    if (companyLoading || !company) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", padding: 2}}>
                <CircularProgress size={15}/>
            </Box>
        );
    }

    const currentDay = new Date().toLocaleDateString("en-US");

    const {data: records, isLoading: recordsLoading} = useRecordsByPeriod(company.id, user.id, currentDay, currentDay);
    const record = records?.[0];

    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 100px",
                    gridTemplateRows: "auto",
                    alignItems: "center",
                    px: 1
                }}
            >
                <Typography>{user.name}</Typography>
                {recordsLoading ? (
                    <CircularProgress size={15}/>
                ) : (
                    <RecordBox record={record} company={company}/>
                )}
            </Box>
            <Divider sx={{my: 1}}/>
        </>
    );
};

export default UserItem;
