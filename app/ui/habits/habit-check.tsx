'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import  { updateHabits, deleteHabit} from '../../lib/actions';
import { Tooltip } from 'react-tooltip'
import { DateTime } from 'luxon';

import {
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

import { Habit, HabitResult } from '@prisma/client';
import { AddHabit } from '@/app/ui/habits/add-habit';   
import Link from 'next/link';




export function HabitRow({ habits, results, habit_index, dates, numberOfChecks, setHabits, setResults}:
  {habits:Habit[], results:HabitResult[][], habit_index:number, dates:string[][], numberOfChecks:number,  setHabits: Function, setResults: Function}) {
    
    const habitId:string = habits[habit_index].id
    const title:string = habits[habit_index].title
    const description:string = habits[habit_index].description
    const color:string = habits[habit_index].color

    const handleDelete = async () => {
      // Keep a copy of the current habits in case we need to rollback
      const previousHabits:Habit[] = [...habits];
      const previousResults:HabitResult[][] = [...results]
    
      // Optimistically remove the habit from the UI
      setHabits((prevHabits:Habit[]) => prevHabits.filter(habit => habit.id !== habitId));
      setResults((prevResults:HabitResult[][]) => {
        const newResults = [...prevResults];
        newResults.splice(habit_index, 1);
        return newResults;
      });
    
      try {
        // Send the delete request to the server
        await deleteHabit(habitId);
      } catch (error) {
        // If the request fails, rollback the change in the UI and show an error message
        setHabits(previousHabits);
        setResults(previousResults);
        alert('Failed to delete habit');
      }
    };
  
    return (
  <div className="pl-1 flex justify-between items-center bg-neutral-800">
    <a  
    data-tooltip-id={habitId} 
    data-tooltip-content=""
    data-tooltip-place="bottom"
     className={`flex-grow text-left text-sm text-${color} `}>{title.length >= 25 ? title.slice(0, 20) + "..." : title  }</a>
    <Tooltip  clickable = {true} id={habitId}>
      <div className = "w-16 items-center text-xs flex flex-col">
        <text className = {`text-wrap text-center flex text-${color}`}>{description} </text>
        <button 
        onClick = {() => handleDelete()} 
        className = "mt-2 hover:bg-neutral-600 border-red-400 rounded text-neutral-400 w-12" >
        Delete</button>
      </div>
    </Tooltip>
    <div className="flex space-x-[20.75px] flex-row flex-wrap pr-[6px]">  
    {Array(numberOfChecks).fill(0).map((_, buttonIndex) => {
        let foundResult = results[habit_index].find((result) => result.date.getUTCDate() === new Date(dates[buttonIndex][2]).getUTCDate());
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
        {complete ? <CheckIcon className={`h-4 w-4 text-${color} font-bold rounded`} /> : <XMarkIcon className="h-4 w-4 text-neutral-700" />}
      </button>
    </div>
  );
}

// Get previous days from current day
function getPastDays(days: number) {
  const result:string[][] = [];
  for (let i = 0; i < days; i++) {
    const dateInCST = DateTime.now().setZone('America/Chicago').minus({ days: i });
    const formattedDate:string = dateInCST.toLocaleString({ day: 'numeric', weekday: 'short' });
    const splitDate:string[] = formattedDate.toUpperCase().split(' ')
    const isoDate:string | null = dateInCST.toISO();
    if (isoDate) {
      splitDate.push(isoDate);
    }
    result.push(splitDate);
  }
  return result;
}

export default function HabitTable({habits: initialHabits, habitResults: initialResults}:{habits:Habit[], habitResults:HabitResult[][]}) {
  const [habits, setHabits] = useState(initialHabits);
  const [results, setResults] = useState(initialResults)

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
    <div className="relative h-screen w-screen ">
      <Link href = "/">
        <div className=" w-32 font-semibold text-7xl text-white md:w-36">
          <h1 >Habits</h1>
          <h1 className="absolute text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-pink-400 to-sky-300">Tracker</h1>
        </div>
      </Link>
      <div className="absolute w-full md:left-[37.5%] top-0 h-full md:w-[62.5%] bg-neutral-900 shadow-md rounded-md">
        <div className="pl-1 pr-1 bg-neutral-950 flex justify-between">
          <h1 className = "text-neutral-50">Habits</h1>
          <div className="flex">
              <AddHabit/>
          </div>
        </div>
        <div className="text-center flex justify-end space-x-3 text-xs text-neutral-500 pr-2">
        {pastDays.map((day, index) => (
            <div key={index}>
              <div>{day[1]}</div>
              <div>{day[0]}</div>
            </div>
          ))}
        </div>
        {habits.map((habit, habit_index) => (
          <div className="p-0.5" key={habit_index}>
            <HabitRow 
            key = {habit.id}
            habits = {habits}
            results = {results}
            habit_index = {habit_index}
            numberOfChecks={numberOfChecks} 
            dates = {pastDays}
            setHabits = {setHabits}
            setResults = {setResults}
            />
          </div>
        ))}
      </div>
    </div>
  );
}