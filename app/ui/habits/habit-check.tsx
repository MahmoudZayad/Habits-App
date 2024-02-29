'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import  { updateHabits, deleteHabit} from '../../lib/actions';
import { Tooltip } from 'react-tooltip'

import {
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

import { Habit, HabitResult } from '@prisma/client';
import { AddHabit } from '@/app/ui/habits/add-habit';   




export function HabitRow({title, color, results, description, habitId, dates, numberOfChecks, habits, setHabits}:
  {title:string, color:string, results:HabitResult[], description:string, habitId:string, dates:string[][], numberOfChecks:number, habits:Habit[], setHabits: Function}) {
  
    const handleDelete = async () => {
      // Keep a copy of the current habits in case we need to rollback
      const previousHabits = [...habits];
  
      // Optimistically remove the habit from the UI
      setHabits(habits.filter(habit => habit.id !== habitId));
  
      try {
        // Send the delete request to the server
        await deleteHabit(habitId);
      } catch (error) {
        // If the request fails, rollback the change in the UI and show an error message
        setHabits(previousHabits);
        alert('Failed to delete habit');
      }
    };
  
    return (
  <div className="pl-1 flex justify-between items-center bg-neutral-800">
    <a  
    data-tooltip-id={habitId} 
    data-tooltip-content=""
    data-tooltip-place="bottom"
     className={`flex-grow text-left text-sm text-${color}`}>{title}</a>
    <Tooltip clickable = {true} id={habitId}>
      <div className = "w-16 items-center text-xs flex flex-col">
        <text className = {`text-wrap text-center flex text-${color}`}>{description} </text>
        <button 
        onClick = {() => handleDelete()} 
        className = "mt-2 hover:bg-neutral-600 border-red-400 rounded text-neutral-400 w-12" >
        Delete</button>
      </div>
    </Tooltip>
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


  const handleClick = async () =>{
    const newCompletedStatus:boolean = !complete; // Toggle the completed status
    setComplete(newCompletedStatus);
    const updatedResult:HabitResult = {...result, completed: newCompletedStatus};
    
    try {
      await updateHabits(updatedResult);
    } catch (error) {
      setComplete(!newCompletedStatus); // If the request fails, rollback the change in the UI
      alert('Failed to update habit');
    }
    
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

export default function HabitTable({habits: initialHabits, habitResults}:{habits:Habit[], habitResults:HabitResult[][]}) {
  const habitsCopy:Habit[]  = [...initialHabits];
  const [habits, setHabits] = useState(initialHabits);

  // To dynamically resize window based on client window size
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const numberOfChecks = Math.floor((windowWidth) / 75); // Change 150 to the width of your buttons
  const pastDays = getPastDays(numberOfChecks); // Get the past n based on window size days

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute w-full md:left-[37.5%] top-0 h-full md:w-[62.5%] bg-neutral-900 shadow-md rounded-md">
        <div className="pl-1 pr-1 bg-neutral-950 flex justify-between">
          <h1 className = "text-neutral-50">Habits</h1>
          <div className="flex">
              <AddHabit/>
          </div>
        </div>
        <div className="text-center flex justify-end space-x-3 text-xs text-neutral-500 pr-1">
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
            description = {habit.description}
            habitId = {habit.id}
            dates = {pastDays}
            habits = {habitsCopy}
            setHabits = {setHabits}
            />
          </div>
        ))}
      </div>
    </div>
  );
}