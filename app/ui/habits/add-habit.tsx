'use client'
import React from 'react'; 
import { useState, useEffect } from 'react';
import {
    PlusIcon,
    TagIcon,
    PencilIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline'

export function AddHabit() {
  return (
    <button>
        <PlusIcon className="h-4 w-4" />
    </button>
  );
}  

export function AddHabitForm() {
  return (
    <div className="mb-4 flex items-center justify-center ">
        <div className='bg-neutral-800 rounded-lg relative mx-auto flex w-full max-w-[300px] flex-col space-y-2.5 p-4'>
            <div className = "flex mt-1 inline-flex">
                <label htmlFor="habitName"></label>
                <div className="relative flex-grow mr-4">
                    <input
                        className="bg-neutral-800 peer block w-full rounded-xl border border-neutral-600 py-[9px] pl-3 text-sm outline-2 placeholder:text-neutral-500"
                        id="habitName"
                        type="text"
                        name="habitName"
                        placeholder="e.g. Read"
                        required
                    />
                    <TagIcon className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500 peer-focus:text-neutral-400" />
                   
                </div>
                <button className="bg-red-300">
                    Color
                    {/* <PencilSquareIcon className="pointer-events-none" /> */}
                </button>
            </div>
            <div className="mt-1">
                <label htmlFor="description"></label>
                <div className="relative">
                    <input
                        className="bg-neutral-800 peer block w-full rounded-xl border border-neutral-600 py-[9px] pl-3 text-sm outline-2 placeholder:text-neutral-500"
                        id="description"
                        type="text"
                        name="description"
                        placeholder="e.g. Read 30 minutes every day"
                        minLength={0}
                    />
                    <PencilIcon className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500 peer-focus:text-neutral-400" />
                </div>
            </div>
        </div>
        </div>
  );
}

export function ColorPicker({color}: {color: string}) {
    const [selectedColor, setSelectedColor] = useState(color);

    const colors: string[] = [
        'bg-[#ee9a9a]', 'bg-[#ffab91]','bg-[#ffcc80]', 'bg-[#ffecb2]',
        'bg-[#69f0ae]', 'bg-[#c5e1a6]','bg-[#e5ee9c]', 'bg-[#fff59e]',
        'bg-[#80cbc6]', 'bg-[#81dfeb]','bg-[#81d5fa]', 'bg-[#64b5f6]',
        'bg-[#f590b2]', 'bg-[#cd94d9]','bg-[#b29edb]', 'bg-[#9fa9da]',
        'bg-[#bcaba4]', 'bg-[#f5f5f5]','bg-[#e0e0e0]', 'bg-[#9e9e9e]']
    useEffect(() => {
        console.log(selectedColor);
    })
    // console.log(selectedColor);
    return(
        <div className="relative bg-neutral-800 rounded-lg p-3 pl-10 pr-10 flex flex-col items-start mx-auto w-fit flex">
            <h2 className="absolute pb-8 font-semibold left-2">Change Color</h2>
            <div className="mt-12 mb-4 inline-grid grid-cols-4 gap-1 grid-rows-5 items-center justify-center">
                {
                    colors.map((color, index) => {
                        return (
                            <button onClick = {() => setSelectedColor(color)} key={index} className={`${color} w-8 h-8 rounded-full`}></button>
                        );
                    })
                }      
            </div>
        </div>
        
    );
    
}
