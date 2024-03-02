import { cache } from 'react'
import 'server-only'
import { getUser, getHabits, getHabitResults} from '../lib/data';
import { Habit, HabitResult } from '@prisma/client';


export const preload = (email: string) => {
    void getItem(email)
}

export const getItem = cache(async (email: string) => {
    const user:string = await getUser(email);
    const habits:Habit[] = await getHabits(user);
    const habitResults:HabitResult[][] = await getHabitResults(habits.map((habit) => habit.id));

    return [habits, habitResults]
})