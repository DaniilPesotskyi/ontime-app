import {useEffect} from "react";

import {useSelector} from "react-redux";
import {Box, Collapse} from "@mui/material";

import {useAppDispatch} from "./hooks/useAppDispatch.ts";

import {selectCompany} from "./store/company/selectors.ts";

import {initializeCompanyThunk} from "./store/company/thunks.ts";
import {fetchIpAndCheckAccess} from "./store/workspace/thunks.ts";
import {getUserThunk} from "./store/user/thunks.ts";

import useTelegram from "./hooks/useTelegram.ts";

import Header from "./components/Header/Header.tsx";
import CheckinButton from "./components/CheckinButton.tsx";
import CompaniesDrawer from "./components/CompaniesDrawer/CompaniesDrawer.tsx";
import Footer from "./components/Footer/Footer.tsx";
import UserInfo from "./components/User/UserInfo.tsx";
import WeeklyAttendance from "./components/WeeklyAttendance/WeeklyAttendance.tsx";
import {selectUser} from "./store/user/selectors.ts";
import UsersStats from "./components/UsersStats/UsersStats.tsx";

function App() {
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser)
    const {tg} = useTelegram()


    const company = useSelector(selectCompany);

    useEffect(() => {
        const initAppData = async () => {
            await dispatch(initializeCompanyThunk())
        }

        tg.expand()
        initAppData()
    }, [dispatch])

    useEffect(() => {
        const getUser = async () => {
            await dispatch(fetchIpAndCheckAccess())
            await dispatch(getUserThunk())
        }

        if (company) {
            getUser()
        }
    }, [company]);

    return (
        <>
            <Collapse in={!!company} timeout="auto" unmountOnExit={true}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: '30px',

                    width: "100%",
                    height: "100%",

                    padding: "20px 10px",
                }}>
                    <Header/>
                    <UserInfo/>
                    {user?.role === 'admin' ? (
                        <UsersStats/>
                    ) : (
                        <>
                            <CheckinButton/>
                            <WeeklyAttendance/>
                            <Footer/>
                        </>
                    )}
                </Box>
            </Collapse>
            <CompaniesDrawer isOpen={company === null}/>
        </>
    )
}

export default App
