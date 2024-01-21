import React from 'react'
import {HabitCheck} from '@/app/ui/habits/habit-check'
import HabitRow from '@/app/ui/habits/habit-check';
export default function HabitTable() {
  return (
      <div>
          <HabitRow/>
          <HabitCheck completed = {true}/>
          <h1>HELLO</h1>
      </div>
  
  );
}

