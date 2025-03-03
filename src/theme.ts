import { createTheme } from '@mui/material/styles';

// @ts-ignore
const themeParams = window.Telegram.WebApp.themeParams;

// Функция для определения, является ли цвет тёмным (на основе яркости)
const isDark = (hexColor: string): boolean => {
    if (!hexColor) return false;
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Стандартная формула для расчёта яркости
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
}

const bgColor = themeParams.bg_color || '#ffffff';
const mode = isDark(bgColor) ? 'dark' : 'light';

export const theme = createTheme({
    palette: {
        mode,
        background: {
            default: bgColor,
            paper: themeParams.bg_color || '#f5f5f5',
        },
        text: {
            primary: themeParams.text_color || (mode === 'dark' ? '#ffffff' : '#000000'),
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
        // Добавляем цвет разделителя, который подбирается автоматически для dark/light режима
        divider: themeParams.divider_color || (mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'),
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
                    color: themeParams.text_color || (mode === 'dark' ? '#ffffff' : '#1976d2'),
                    '&.Mui-disabled': {
                        borderColor: themeParams.hint_color || '#808080', // Серый контур
                        color: themeParams.hint_color || '#808080', // Серый текст
                    },
                },
                text: {
                    color: themeParams.text_color || (mode === 'dark' ? '#ffffff' : '#1976d2'),
                    '&.Mui-disabled': {
                        color: themeParams.hint_color || '#808080', // Серый текст
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: themeParams.text_color || (mode === 'dark' ? '#ffffff' : '#000000'),
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: themeParams.text_color || (mode === 'dark' ? '#ffffff' : '#000000'),
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: themeParams.text_color || (mode === 'dark' ? '#ffffff' : '#000000'),
                    },
                },
            },
        },
        // Стиль для компонента Divider, чтобы он не сливался с фоном
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: themeParams.divider_color || (mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'),
                },
            },
        },
    },
});
