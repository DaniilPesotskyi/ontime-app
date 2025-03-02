import React, {useState} from "react";

import {Button, Skeleton} from "@mui/material";
import {HomeOutlined} from "@mui/icons-material";

import {IRecord} from "../../../../types/record";

import {useAccess} from "../../../../hooks/useAccess.ts";
import {useCompany} from "../../../../hooks/company/useCompany.ts";

import isLate from "../../../../utils/isLate.ts";

import ReasonsDrawer from "./ReasonsDrawer.tsx";
import {green, orange} from "@mui/material/colors";

interface IProps {
    onCheck: (newRecord: IRecord) => void
    isLoading: boolean
    disabled?: boolean
}

const currentDay = new Date().toLocaleDateString("en-US");
const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

const CheckinButton: React.FC<IProps> = ({onCheck, isLoading, disabled}) => {
    const {data: hasAccess, isLoading: isAccessLoading} = useAccess()
    const {data: company} = useCompany()

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const isLateValue = isLate(company ? company.startWorkHour : 9)

    const handleCheckButtonClick = (type: IRecord['type'], reason?: IRecord['reason']) => {
        // if late onsite
        if (isLateValue && type === 'onsite' && !isDrawerOpen) {
            setIsDrawerOpen(true)
            return;
        }

        onCheck({
            reason: reason ? reason : '',
            type: type,
            time: currentTime.replaceAll('/', '-'),
            day: currentDay.replaceAll('/', '-'),
        })

        setIsDrawerOpen(false)
    }

    return (
        <>
            {isLoading ? (
                <Skeleton
                    variant="circular"
                    sx={{
                        width: '220px',
                        height: '220px',
                        margin: '0 auto'
                    }}/>

            ) : (
                <>
                    {/*On-site checkin button*/}
                    <Button
                        variant="contained"
                        disabled={isLoading || isAccessLoading || disabled || !hasAccess}
                        sx={{
                            display: "block",

                            width: '220px',
                            height: '220px',

                            margin: '0 auto 40px auto',

                            backgroundColor: isLateValue ? orange[300] : green['300'],

                            borderRadius: "50%",
                        }}
                        onClick={() => handleCheckButtonClick('onsite', '')}
                    >
                        Відмітитись {isLateValue && 'із запізненням'}
                    </Button>
                    {/*Remote checkin*/}
                    {!hasAccess && (
                        <Button
                            variant={'contained'}
                            startIcon={<HomeOutlined/>}
                            onClick={() => handleCheckButtonClick('remote', '')}
                            disabled={isLoading}
                            sx={{
                                display: 'flex',
                                margin: "0 auto"
                            }}
                        >
                            Відмітитись віддалено
                        </Button>
                    )}
                    <ReasonsDrawer
                        isOpen={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                        onCheck={handleCheckButtonClick}
                    />
                </>
            )}
        </>
    )
}

export default CheckinButton