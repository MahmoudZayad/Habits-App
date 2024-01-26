export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

export type Habit = {
    title: string;
    description: string; 
    color: string; // Color of habit name and checks
    startDate: Date; // Date habit was started
    endDate: Date; // Date habit was deleted
    results: boolean[]; 
}
