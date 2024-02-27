'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import  { updateHabits, deleteHabit} from '../../lib/actions';

import {
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

import { Habit, HabitResult } from '@prisma/client';
import { AddHabit } from '@/app/ui/habits/add-habit';   




export function HabitRow({title, color, results, habitId, dates, numberOfChecks}:
  {title:string, color:string, results:HabitResult[], habitId:string, dates:string[][], numberOfChecks:number}) {
  return (
    <div className="pl-1 flex justify-between items-center bg-neutral-800">
      <button onClick = {() => deleteHabit(habitId)} className={`flex-grow text-left text-sm text-${color}`}>{title}</button>
      <div className="flex space-x-5 flex-row flex-wrap pr-0.5">
      {Array(numberOfChecks).fill(0).map((_, buttonIndex) => {
          let foundResult = results.find((result) => result.date.getUTCDate() === new Date(dates[buttonIndex][2]).getUTCDate());
          return (
            <HabitCheck 
              result={foundResult ? foundResult : {date:new Date(dates[buttonIndex][2]), completed:false, habitId:habitId} as HabitResult}
              color={color}
              key={buttonIndex}
            />
          );
        })}
      </div>
    </div>
  );
}

export function HabitCheck({color, result}:{color: string, result:HabitResult}) {
  
  const [complete, setComplete] = useState(result.completed);


  function handleClick() {
    const newCompletedStatus:boolean = !complete; 
    setComplete(newCompletedStatus);
    const updatedResult:HabitResult = {...result, completed: newCompletedStatus};
    updateHabits(updatedResult);
  }

  return (
    <div>
      <button onClick={handleClick}>
        {complete ? <CheckIcon className={`h-4 w-4 text-${color}`} /> : <XMarkIcon className="h-4 w-4 text-neutral-700" />}
      </button>
    </div>
  );
}

// Get previous days from current day
function getPastDays(days: number) {
  const result:string[][] = [];
  for (let i = 0; i < days; i++) {
    const date:Date = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));
    date.setDate(date.getDate() - i);
    const formattedDate:string = date.toLocaleDateString('en-US', { day: 'numeric', weekday: 'short' });
    const splitDate:string[] = formattedDate.toUpperCase().split(' ')
    splitDate.push(date.toString());
    result.push(splitDate);
  }
  return result;
}

export default function HabitTable({habits, habitResults}:{habits:Habit[], habitResults:HabitResult[][]}) {


  // To dynamically resize window based on client window size
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const numberOfChecks = Math.floor((windowWidth / 3) / 50); // Change 150 to the width of your buttons
  const pastDays = getPastDays(numberOfChecks); // Get the past n based on window size days
  // console.log(pastDays);

  return (
    <div className="flex h-screen">
      <div className="h-full w-full md:w-1/2 lg:w-1/3 bg-neutral-900 shadow-md rounded-md  m-auto">
        <div className="pl-1 pr-1 bg-neutral-950 flex justify-between">
          <h1 className = "text-neutral-50">Habits</h1>
          <div className="flex">
              <AddHabit/>
          </div>
        </div>
        <div className="text-center flex justify-end space-x-3 text-xs text-neutral-500">
        {pastDays.map((day, index) => (
            <div key={index}>
              <div>{day[1]}</div>
              <div>{day[0]}</div>
            </div>
          ))}
        </div>
        {habits.map((habit, habit_index) => (
          <div className="p-1" key={habit_index}>
            <HabitRow title={habit.title} 
            color = {habit.color} 
            numberOfChecks={numberOfChecks} 
            results = {habitResults[habit_index]} 
            habitId = {habit.id}
            dates = {pastDays}
            />
          </div>
        ))}
      </div>
    </div>
  );
}