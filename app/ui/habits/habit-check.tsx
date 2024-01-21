'use client'
import React from 'react';
import { useState, useEffect } from 'react';

import {
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'



export default function HabitRow() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const numberOfChecks = Math.floor(windowWidth / 50); // Change 200 to the width of your buttons
    const buttons = Array.from({ length: numberOfChecks }, (_, i) => i + 1);
  
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {buttons.map((buttonIndex) => (
          <HabitCheck completed = {true} key={buttonIndex}/>
        ))}
      </div>
    );
  }

export function HabitCheck({completed}:{completed:boolean}) {

    const [complete, setComplete] = useState(completed)

    function handleClick() {
        setComplete(!complete)
    }

    return (
      <div>
        <button onClick={handleClick}>
            {complete ? <CheckIcon className="h-5 w-5 text-green-700" /> : <XMarkIcon className="h-5 w-5 text-gray-700" />}
        </button>
      </div>
    );
  }