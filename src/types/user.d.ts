export interface IUser {
    id: number,
    telegramId: number,
    department: string,
    name: string,
    role: 'admin' | 'user',
}