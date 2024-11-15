import React from "react";
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";

import {store} from "./store.ts";
import {theme} from "../theme.ts";

interface IProps {
    children: React.ReactNode
}

export const Providers: React.FC<IProps> = ({children}) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </Provider>
    )
}