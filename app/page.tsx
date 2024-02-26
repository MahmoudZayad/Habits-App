import React from 'react';

import { AddHabitForm, AddHabit, ColorPicker  } from '@/app/ui/habits/add-habit';   

export default function App() {
    return (
        <div>
        <AddHabit/>
        <AddHabitForm color = "bg-[#64b5f6]"/>
        </div>
    );
    }
