export type Habit = {
    id?: string;
    userId: string;
    title: string;
    description: string; 
    color: string; // Color of habit name and checks 
}

export type HabitResult = {
    date: string;
    completed: boolean;
    habit_id: string;
}


