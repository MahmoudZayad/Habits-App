import prisma from '../utils/db';

import {Habit, HabitResult } from '@prisma/client';

import { unstable_noStore as noStore } from 'next/cache';


async function main() {

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
    })


// Use user email to grab the user return user row
export async function getUser(email: string) {
    try {
        
        const data = await prisma.user.findFirst({  
            where: { 
                email: email 
            } 
        });

        if (data) { 
            return data.id as string;
            
        }   else { 
            throw new Error('User not found.'); 
        }

    } catch (error) {
        console.error('Failed to fetch user.', error);
        throw new Error('Failed to fetch user.');
    }
}

// Use user id to grab all habits for that user
export async function getHabits(userId: string) {
    noStore();
    try {
        const data:Habit[] = await prisma.habit.findMany({
            where: {
                userId: userId
            }
        });
        return data;

    } catch (error) {
        console.error('Database error, failed fetching habits.', error);
        throw new Error('Failed to fetch habits.');
    }
}

// Use habit_ids to grab all habit results for each habit
export async function getHabitResults(habits: string[]) {
    noStore();
    try {
        const data:HabitResult[][] = await Promise.all(
            habits.map(async (habitId) => {
              const habitResults = prisma.habitResult.findMany({
                where: {
                  habitId: habitId
                }
              });
              return habitResults;
            })
          );
        return data;
        
    } catch (error) {
        console.error('Database error, failed fetching habit results.', error);
        throw new Error('Failed to fetch habit results.');
    }
}

// Use habit_ids to grab all habit results for each habit
export async function getHabitResultByDateAndId(date:Date, habitId:string) {
    noStore();
    
    try {
        const data = await prisma.habitResult.findFirst({  
            where: {
                date: date,
                habitId: habitId 
            }
        });

        if (data) { 
            return data as HabitResult;
        } else { 
            return {date: date, completed: false, habitId: habitId} as HabitResult;
        }
        
    } catch (error) {
        console.error('Database error, failed fetching habit results.', error);
        throw new Error('Failed to fetch habit results.');
    }
}
