export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

export type Habit = {
    id: string;
    user_id: string;
    title: string;
    description: string; 
    color: string; // Color of habit name and checks 
}

export type HabitResult = {
    date: string;
    completed: boolean;
    habit_id: string;
}


