// @ts-ignore
const tg = window.Telegram.WebApp;

const useTelegram = () => {
    return {
        tg,
        tgUser: tg.initDataUnsafe.user,
    }
}

export default useTelegram