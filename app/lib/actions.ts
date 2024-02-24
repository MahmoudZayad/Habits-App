
'use server';
import { HabitResult } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect} from 'next/navigation';
import prisma from '../utils/db';


export async function updateHabits(result:HabitResult) {
    
    await prisma.habitResult.update({

        where: {
            date_habitId: {
                date: result.date,
                habitId: result.habitId
            }
        },
        data: {
            completed: result.completed
        }
    });
    
    revalidatePath('/habits');
    redirect('/habits');
}