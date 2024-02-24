'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import  { updateHabits} from '../../lib/actions';

import {
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

import { Habit, HabitResult } from '@prisma/client';



export function HabitRow({title, color, results, numberOfChecks}:{title:string, color:string, results:HabitResult[], numberOfChecks:number}) {
  
  return (
    <div className="flex justify-between items-center bg-neutral-800">
      <div className={`flex-grow text-left text-sm ${color}`}>{title}</div>
      <div className="flex space-x-5 flex-row flex-wrap pr-0.5">
        {Array(numberOfChecks).fill(0).map((_, buttonIndex) => (
          <HabitCheck 
            result = {results[results.length - 1 - buttonIndex]}
            color={color}
            key={buttonIndex}
          />
        ))}
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
        {complete ? <CheckIcon className={`${color} h-4 w-4`} /> : <XMarkIcon className="h-4 w-4 text-neutral-700" />}
      </button>
    </div>
  );
}

// Get previous days from current day
function getPastDays(days: number) {
  const result = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', weekday: 'short' });
    result.push(formattedDate.toUpperCase().split(' '));
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

  // To determine how many checks to display based on window size
  const numberOfChecks = Math.floor(windowWidth / 150); // Change 150 to the width of your buttons
  const pastDays = getPastDays(numberOfChecks); // Get the past n based on window size days


  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 lg:w-1/3 h-full md:h-1/2 lg:h-1/3 bg-neutral-900 shadow-md rounded-md p-4 m-auto">
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
            results = {habitResults[habit_index]} />
          </div>
        ))}
      </div>
    </div>
  );
}