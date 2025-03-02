import { createTheme } from '@mui/material/styles';

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
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: themeParams.button_color || '#1976d2',
                    color: themeParams.button_text_color || '#ffffff',
                    '&.Mui-disabled': {
                        backgroundColor: themeParams.hint_color || '#808080', // Серый фон для отключенной кнопки
                        color: themeParams.text_color ? `${themeParams.text_color}80` : '#ffffff80', // Полупрозрачный текст
                    },
                },
                outlined: {
                    borderColor: themeParams.button_color || '#1976d2',
                    color: themeParams.text_color || '#1976d2',
                    '&.Mui-disabled': {
                        borderColor: themeParams.hint_color || '#808080', // Серый контур
                        color: themeParams.hint_color || '#808080', // Серый текст
                    },
                },
                text: {
                    color: themeParams.text_color || '#1976d2',
                    '&.Mui-disabled': {
                        color: themeParams.hint_color || '#808080', // Серый текст
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: themeParams.text_color || '#ffffff',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: themeParams.text_color || '#000000',
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: themeParams.text_color || '#000000',
                    },
                },
            },
        },
    },
});
