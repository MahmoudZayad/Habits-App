import React from 'react';

import { AddHabitForm, AddHabit, ColorPicker  } from '@/app/ui/habits/add-habit';   

export default function App() {
    return (
        <div>
        <AddHabit/>
        <AddHabitForm/>
        <ColorPicker color ={""}/>
        </div>
    );
    }
