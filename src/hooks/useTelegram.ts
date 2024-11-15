// @ts-ignore
const tg = window.Telegram.WebApp;

const useTelegram = () => {
    return {
        tg,
        user: tg.initDataUnsafe.user,
    }
}

export default useTelegram