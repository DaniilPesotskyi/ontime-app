export interface IRecord {
    type: 'onsite' | 'remote',
    day: string,
    time: string
    reason: string
}