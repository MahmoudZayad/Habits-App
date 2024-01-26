'use client'
import React from 'react';
import { useState, useEffect } from 'react';

import {
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'



export function HabitRow({name}:{name:string}) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const numberOfChecks = Math.floor(windowWidth / 100); // Change 200 to the width of your buttons
    const buttons = Array.from({ length: numberOfChecks }, (_, i) => i + 1);
  
    return (
      <div className = 'bg-neutral-800 flex space-x-20 justify-end'>
        <h3 className = 'text-sm text-neutral-100'>{name}</h3>
        <div className = 'flex space-x-5'>
          {buttons.map((buttonIndex) => (
            <HabitCheck  color = {""} completed = {true} key={buttonIndex}/>
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
            {complete ? <CheckIcon className="h-5 w-5 text-green-700" /> : <XMarkIcon className="h-5 w-5 text-neutral-700" />}
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
  const habits = ['1', '2', '3']; // Replace with your actual habits
  const pastDays = getPastDays(12); // Get the past 7 days

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 lg:w-1/3 h-full md:h-1/2 lg:h-1/3 bg-neutral-900 shadow-md rounded-md p-4 m-auto">
        <div className="text-center flex justify-end space-x-2 text-xs text-neutral-500">
        {pastDays.map((day, index) => (
            <div key={index}>
              <div>{day[1]}</div>
              <div>{day[0]}</div>
            </div>
          ))}
        </div>
        {habits.map((habit, index) => (
          <div className="p-1" key={index}>
            <HabitRow name={habit} />
          </div>
        ))}
      </div>
    </div>
  );
}