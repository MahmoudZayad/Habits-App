export type Habit = {
    name: string;
    description: string;
    color: string;
    startDate: Date; // Date habit was started
    endDate: Date; // Date habit was deleted
    results: boolean[]; 
}

export const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
] as const;
export type Month = typeof months[number];

export const days = [
    'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
] as const;
export type Day = typeof days[number];  
