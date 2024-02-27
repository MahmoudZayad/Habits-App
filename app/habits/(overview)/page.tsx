import React from 'react'

import HabitTable from '@/app/ui/habits/habit-check';
import { AddHabit } from '@/app/ui/habits/add-habit';   
import { getUser, getHabits, getHabitResults} from '../../lib/data';
import { Habit, HabitResult } from '@prisma/client';




export default async function Table() {
  const email:string = 'mahmoudzayad@gmail.com'
  const user:string = await getUser(email);
  const habits:Habit[] = await getHabits(user);
  const habitResults:HabitResult[][] = await getHabitResults(habits.map((habit) => habit.id));

  return (
    <div>
      <HabitTable habits = {habits} habitResults = {habitResults}/>
    </div>
    
  );
}

