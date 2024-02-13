import { sql } from '@vercel/postgres';

import {
    User,
    Habit,
    HabitResult
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

// Use user email to grab the user return user row
export async function getUser(email: string) {
    try {
        const user = await sql`SELECT * FROM users WHERE email = ${email}`;
        return user.rows[0] as User;
    } catch (error) {
        console.error('Failed to fetch user.', error);
        throw new Error('Failed to fetch user.');
    }
}

// Use user id to grab all habits for that user
export async function getHabits(userId: string) {
    noStore();
    try {
        const data = await sql`SELECT * FROM habits WHERE user_id = ${userId}`;
        const habits = data.rows as Habit[];
        return habits;
    } catch (error) {
        console.error('Database error, failed fetching habits.', error);
        throw new Error('Failed to fetch habits.');
    }
}

// Use habit_ids to grab all habit results for each habit
export async function getHabitResults(habits: string[]) {
    noStore();
    try {
        const data = await Promise.all(
            habits.map(async (habitId) => {
              const habitResults = await sql<HabitResult[]>`
                SELECT * FROM habit_results WHERE habit_id = ${habitId}
              `;
              return habitResults.rows;
            })
          );
        return data;
        
    } catch (error) {
        console.error('Database error, failed fetching habit results.', error);
        throw new Error('Failed to fetch habit results.');
    }
}

export default async function printUserHabitsAndResults(userId: string) {
    try {
      const user = await getUser(userId);
      console.log('User:', user);
  
      const habits = await getHabits(userId);
      console.log('Habits:', habits);
  
      const habitResults = await getHabitResults(habits.map((habit) => habit.id));
      console.log('Habit Results:', habitResults);
    } catch (error) {
      console.error('Error:', error);
    }
  }

