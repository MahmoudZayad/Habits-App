'use client'
import React from 'react'; 
import { useState, useEffect } from 'react';

import Link from 'next/link';
import {
    PlusIcon,
    TagIcon,
    PencilIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { Habit } from '../../lib/definitions';
import { createHabit } from '../../lib/actions';
import clsx from 'clsx';

export function AddHabit() {
  return (
        <Link href="/habits/create">
            <PlusIcon className="text-neutral-50 hover:text-neutral-400 h-5 w-5" />
        </Link>
        
  );
}  

export function AddHabitForm({userId}: {userId: string}) {
    let color = "bg-[#ee9a9a]";
    const [selectedColor, setSelectedColor] = useState(color);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [habitName, setHabitName] = useState('');
    const [habitDescription, setHabitDescription] = useState('');
    const toggleColorPicker = () => setShowColorPicker(!showColorPicker);

    function saveHabit() {
        const habit:Habit = {
            title: habitName,
            description: habitDescription,
            color: selectedColor.slice(3, 12),
            userId: userId,
        }
        createHabit(habit);
    }


  return (
    <div className="flex items-center justify-center flex-col">
        <div className={clsx("mb-4 flex items-center flex-col justify-center",
            {
                'opacity-100' : !showColorPicker,
                'opacity-50' : showColorPicker
            },
            )}>
            <div className ="w-full flex justify-between items-center">
            <div className = "inline-flex">
                <Link href ="/habits" className = "p-2">
                    <ArrowLeftIcon className="text-neutral-100 hover:text-neutral-400 h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-neutral-100">Create habit</h1>
            </div>
            <div className = "pr-2">
                <button onClick = {() => saveHabit()}disabled = {habitName === "" ? true : false} className = "disabled:opacity-50 disabled:hover:bg-transparent hover:bg-neutral-800 border rounded-sm h-7 w-16 ">Save</button>
            </div>
            </div> 
            <div className='bg-neutral-800 rounded-lg relative mx-auto flex w-full min-w-[300px] max-w-[300px] flex-col space-y-2.5 p-4'>
                <div className = "mt-1 inline-flex">
                    <label htmlFor="habitName"></label>
                    <div className="relative mr-4">
                        <input
                            className="bg-neutral-800 peer focus:outline-neutral-700 focus:ring-2 block w-full rounded-xl border border-neutral-600 py-[9px] pl-3 text-sm outline-2 placeholder:text-neutral-500"
                            id="habitName"
                            type="text"
                            name="habitName"
                            placeholder="e.g. Read"
                            onChange = {(e) => setHabitName(e.target.value)}
                            required
                            readOnly = {showColorPicker}

                        />
                        <TagIcon className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500 peer-focus:text-neutral-400" />
                    </div>
                    <div className = "mx-auto w-15 relative flex flex-col justify-center items-center mt-[-10px] border-neutral-700 p-1">
                        <h1 className = "absolute font-normal text-sm text-neutral-500 mb-5">Color</h1>
                        <button onClick ={toggleColorPicker} className={clsx(`${selectedColor} mt-5 border-neutral-700 rounded hover:ml-0.5 hover:w-4 hover:h-4 hover:opacity-50`,
                        {
                            "h-4 w-4 opacity-50 ml-0.5": showColorPicker,
                            "h-5 w-5": !showColorPicker, 
                        }
                        )}>
                        </button>
                    </div>
                </div>
                <div className="mt-1">
                    <label htmlFor="description"></label>
                    <div className="relative">
                        <input
                            className="bg-neutral-800 peer focus:outline-neutral-700 focus:ring-2 block w-full rounded-xl border border-neutral-600 py-[9px] pl-3 text-sm outline-2 placeholder:text-neutral-500"
                            id="description"
                            type="text"
                            name="description"
                            placeholder="e.g. Read 30 minutes every day"
                            readOnly = {showColorPicker}
                            onChange = {(e) => setHabitDescription(e.target.value)}

                        />
                        <PencilIcon className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500 peer-focus:text-neutral-400" />
                    </div>
                </div>
            </div>
        </div>
        <div className = {clsx("",
                {
                    "hidden": !showColorPicker,
                    "block": showColorPicker,
                }
                
            )} >
            <ColorPicker habitColor = {selectedColor} showColorPicker = {showColorPicker} setShowColorPicker={setShowColorPicker} setSelectedColor = {setSelectedColor} />
        </div>
    </div>   
  );
}

export function ColorPicker({habitColor, showColorPicker, setShowColorPicker, setSelectedColor}: {habitColor: string, showColorPicker: boolean, setShowColorPicker: (show: boolean) => void, setSelectedColor: (color: string) => void}) {
   

    const colors: string[] = [
        'bg-[#ee9a9a]', 'bg-[#ffab91]','bg-[#ffcc80]', 'bg-[#ffecb2]',
        'bg-[#69f0ae]', 'bg-[#c5e1a6]','bg-[#e5ee9c]', 'bg-[#fff59e]',
        'bg-[#80cbc6]', 'bg-[#81dfeb]','bg-[#81d5fa]', 'bg-[#64b5f6]',
        'bg-[#f590b2]', 'bg-[#cd94d9]','bg-[#b29edb]', 'bg-[#9fa9da]',
        'bg-[#bcaba4]', 'bg-[#f5f5f5]','bg-[#e0e0e0]', 'bg-[#9e9e9e]']
   
    return(
        <div  id ="colorPicker" className="relative bg-neutral-800 rounded-lg p-3 pl-10 pr-10 flex-col items-start mx-auto w-fit flex">
            <h1 className="absolute text-neutral-500 pb-8 font-normal text-md left-2">Change Color</h1>
            <div className="mt-12 mb-4 inline-grid grid-cols-4 gap-1 grid-rows-5 items-center justify-center">
                {
                    colors.map((color, index) => {
                        return (
                            <button onClick = {() => [setSelectedColor(color), setShowColorPicker(!showColorPicker)] } key={index} className={clsx(`${color} rounded-full hover:ml-0.5 hover:w-7 hover:h-7 hover:opacity-50`,
                            {
                                "opacity-50 w-7 h-7 ml-0.5": habitColor === color,
                                "w-8 h-8": habitColor !== color,
                            }
                            )}
                            ></button>
                            
                        );
                    })
                }      
            </div>
        </div>  
    );   
}

