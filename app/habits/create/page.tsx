import React from 'react';
import { getServerSession } from "next-auth";
import { AddHabitForm, AddHabit, ColorPicker  } from '@/app/ui/habits/add-habit';   
import { authOptions } from "@/app/utils/auth";
import { getUser} from '../../lib/data';
import { redirect} from 'next/navigation';

export default async function App() {
    const session = await getServerSession(authOptions);
    
    if (session === null) {
        redirect('/login');
    }

    const user:string = await getUser(session.user?.email as string);

    return (
        <div>
        <AddHabitForm userId={user}/>
        </div>
    );
    }
