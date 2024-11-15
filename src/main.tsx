// import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import './index.css'

import App from './App.tsx'
import {Providers} from "./store/Providers.tsx";
import {CssBaseline} from "@mui/material";

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
        <Providers>
            <CssBaseline/>
            <App/>
        </Providers>
    // </StrictMode>,
)
