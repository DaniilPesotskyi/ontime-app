import {createTheme} from '@mui/material/styles';

// @ts-ignore
const themeParams = window.Telegram.WebApp.themeParams;

export const theme = createTheme({
    palette: {
        background: {
            default: themeParams.bg_color || '#ffffff',
            paper: themeParams.bg_color || '#f5f5f5',
        },
        text: {
            primary: themeParams.text_color || '#000000',
            secondary: themeParams.hint_color || '#808080',
        },
        primary: {
            main: themeParams.button_color || '#0088cc',
            contrastText: themeParams.button_text_color || '#ffffff',
        },
        secondary: {
            main: themeParams.accent_color || '#ff4081',
            contrastText: themeParams.accent_text_color || '#ffffff',
        },
        error: {
            main: themeParams.destructive_color || '#f44336',
            contrastText: themeParams.destructive_text_color || '#ffffff',
        },
    },

});
