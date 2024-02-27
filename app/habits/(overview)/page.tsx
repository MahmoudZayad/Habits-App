import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import HabitTable from '@/app/ui/habits/habit-check';
import { redirect} from 'next/navigation';
import { getUser, getHabits, getHabitResults} from '../../lib/data';
import { Habit, HabitResult } from '@prisma/client';




export default async function Table() {
  const session = await getServerSession(authOptions);
 
  
  if (session === null) {
      redirect('/');
  }

  const user:string = await getUser(session.user?.email as string);
  const habits:Habit[] = await getHabits(user);
  const habitResults:HabitResult[][] = await getHabitResults(habits.map((habit) => habit.id));

  return (
    <div>
      <HabitTable habits = {habits} habitResults = {habitResults}/>
    </div>
    
  );
}

