import React, {useState} from "react";
import {useSelector} from "react-redux";

import {
    Button,
    SwipeableDrawer,
    Typography
} from "@mui/material";

import {useAppDispatch} from "../../hooks/useAppDispatch.ts";

import {selectCompany} from "../../store/company/selectors.ts";

import {removeFromLocalStorage} from "../../utils/localStorage.ts";

import {LOCAL_STORAGE_COMPANY_KEY} from "../../constants.ts";

import {clearCompany} from "../../store/company/companySlice.ts";
import {clearUser} from "../../store/user/userSlice.ts";

const CompanyChanger: React.FC = () => {
    const dispatch = useAppDispatch();

    const company = useSelector(selectCompany)

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const leaveCompany = () => {
        setIsOpen(false);
        removeFromLocalStorage(LOCAL_STORAGE_COMPANY_KEY)
        dispatch(clearCompany())
        dispatch(clearUser())
    }

    if (!company) {
        return (
            <div></div>
        )
    }

    return (
        <>
            <Button disableElevation sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
            }}
                    onClick={() => setIsOpen(true)}
            >
                <Typography sx={{
                    fontSize: 24,
                    fontWeight: 700,
                    // color: '',
                }}>
                    {company.title}
                </Typography>
            </Button>
            <SwipeableDrawer
                anchor={'bottom'}
                open={isOpen}
                onClose={() => setIsOpen(false)}
                onOpen={() => setIsOpen(true)}
            >
                <Button
                    onClick={leaveCompany}
                    sx={{
                        padding: "35px 0px",
                    }}
                >
                    Вийти з компанії
                </Button>
            </SwipeableDrawer>
        </>
    )
}

export default CompanyChanger;