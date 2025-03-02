export interface IRecord {
    type: RecordType,
    day: string,
    time: string
    reason?: string
}

type RecordType = 'onsite' | 'remote' | 'vacation' | 'sick-leave' | 'day-off'