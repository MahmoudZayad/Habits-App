'use client'
import React from 'react';
import { useState } from 'react';

import {
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

export default function HabitCheck({completed}:{completed:boolean}) {

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