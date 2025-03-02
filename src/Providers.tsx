import React, {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {BrowserRouter} from "react-router-dom";
import {theme} from "./theme.ts";
import {CssBaseline, ThemeProvider} from "@mui/material";

interface IProps {
    children: React.ReactNode
}

const Providers: React.FC<IProps> = ({children}) => {
    const [queryClient] = useState<QueryClient>(() => new QueryClient());

    return (
        <>
            <BrowserRouter basename={'/'}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        {children}
                    </ThemeProvider>
                    <ReactQueryDevtools initialIsOpen={true}/>
                </QueryClientProvider>
            </BrowserRouter>
        </>
    )
}

export default Providers;