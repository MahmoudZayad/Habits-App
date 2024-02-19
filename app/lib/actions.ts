
'use server';
import { HabitResult } from './definitions';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect} from 'next/navigation';



export async function updateHabits(result:HabitResult) {
    
    await sql`
        UPDATE habit_results
        SET completed = ${result.completed} 
        WHERE date = ${result.date} AND habit_id = ${result.habit_id}`;
    
    revalidatePath('/habits');
    redirect('/habits');
}