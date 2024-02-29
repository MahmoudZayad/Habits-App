
'use server';
import { Habit } from '../lib/definitions';
import { HabitResult } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect} from 'next/navigation';
import prisma from '../utils/db';


export async function updateHabits(result:HabitResult) {
    
    await prisma.habitResult.upsert({

        where: {
            date_habitId: {
                date: result.date,
                habitId: result.habitId
            }
        },
        update: {
            completed: result.completed
        },
        create: {
            date: result.date,
            completed: result.completed,
            habitId: result.habitId
        }
    });
    revalidatePath('/habits'); 
}

export async function createHabit(habit:Habit) {
    
    await prisma.habit.create({
        data: habit
    });
    revalidatePath('/habits');
    redirect('/habits');
}

export async function deleteHabit(habitId:string) {
    
    await prisma.habitResult.deleteMany({
        where: {
            habitId: habitId
        }
    });

    await prisma.habit.delete({
        where: {
            id: habitId

        }
    });

    revalidatePath('/habits');

}