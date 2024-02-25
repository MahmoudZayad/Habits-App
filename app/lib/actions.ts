
'use server';
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
    redirect('/habits');
}

