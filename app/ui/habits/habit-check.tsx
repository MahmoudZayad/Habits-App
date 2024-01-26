'use client'
import React from 'react';
import { useState, useEffect } from 'react';

import {
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'



export function HabitRow({title, color, results, numberOfChecks}:{title:string, color:string, results:boolean[], numberOfChecks:number}) {
  
    const buttons = Array.from({ length: numberOfChecks }, (_, i) => i + 1);

  
    return (
      <div className = 'bg-neutral-800 flex space-x-20 justify-end'>
        <h3 className = 'text-sm text-neutral-100'>{title}</h3>
        <div className = 'flex space-x-5'>
          {buttons.map((buttonIndex) => (
            <HabitCheck  color = {color} completed = {results[results.length -  buttonIndex]} key={buttonIndex}/>
          ))}
          </div>
      </div>
    );
  }

export function HabitCheck({color, completed}:{color: string, completed:boolean}) {

    const [complete, setComplete] = useState(completed)

    function handleClick() {
        setComplete(!complete)
    }

    return (
      <div>
        <button onClick={handleClick}>
            {complete ? <CheckIcon className={`${color} h-4 w-4`} /> : <XMarkIcon className="h-4 w-4 text-neutral-700" />}
        </button>
      </div>
    );
  }

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

export default function HabitTable() {
  const habits = ['1', '2', '3']; // Replace with actual habits


  let results =  [true, true, true, false, false, false, false, true, true, true, true, true]

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
  const numberOfChecks = Math.floor(windowWidth / 200); // Change 200 to the width of your buttons
  const pastDays = getPastDays(numberOfChecks); // Get the past 7 days
  // const boolean = [true, false, true, false, true, false, true, false, true, false, true, false]

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
        {habits.map((habit, index) => (
          <div className="p-1" key={index}>
            <HabitRow title={habit} color = {"text-green-300"} numberOfChecks={numberOfChecks} results = {results}/>
          </div>
        ))}
      </div>
    </div>
  );
}