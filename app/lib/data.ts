import prisma from '../utils/db';

import {Habit, HabitResult } from '@prisma/client';

import { unstable_noStore as noStore } from 'next/cache';


async function main() {

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
    })


// Use user email to grab the user return user row
export async function getUser(email: string) {
    try {
        
        const data = await prisma.user.findFirst({  
            where: { 
                email: email 
            } 
        });

        if (data) { 
            return data.id as string;
            
        }   else { 
            throw new Error('User not found.'); 
        }

    } catch (error) {
        console.error('Failed to fetch user.', error);
        throw new Error('Failed to fetch user.');
    }
}

// Use user id to grab all habits for that user
export async function getHabits(userId: string) {
    noStore();
    try {
        const data:Habit[] = await prisma.habit.findMany({
            where: {
                userId: userId
            }
        });
        return data;

    } catch (error) {
        console.error('Database error, failed fetching habits.', error);
        throw new Error('Failed to fetch habits.');
    }
}

// Use habit_ids to grab all habit results for each habit
export async function getHabitResults(habits: string[]) {
    noStore();
    try {
        const data:HabitResult[][] = await Promise.all(
            habits.map(async (habitId) => {
              const habitResults = prisma.habitResult.findMany({
                where: {
                  habitId: habitId
                }
              });
              return habitResults;
            })
          );
        return data;
        
    } catch (error) {
        console.error('Database error, failed fetching habit results.', error);
        throw new Error('Failed to fetch habit results.');
    }
}

// Use habit_ids to grab all habit results for each habit
export async function getHabitResultByDateAndId(date:Date, habitId:string) {
    noStore();
    
    try {
        const data = await prisma.habitResult.findFirst({  
            where: {
                date: date,
                habitId: habitId 
            }
        });

        if (data) { 
            return data as HabitResult;
        } else { 
            return {date: date, completed: false, habitId: habitId} as HabitResult;
        }
        
    } catch (error) {
        console.error('Database error, failed fetching habit results.', error);
        throw new Error('Failed to fetch habit results.');
    }
}



/*
Yes, you can definitely update the database when a user logs in. You can modify your login function to check for missing dates and fill them in as part of the login process. 

Here's a pseudocode outline of how you might do this:

1. When a user logs in, get the current date.
2. Get the latest date for each of the user's habits from the `habit_results` table.
3. For each habit, check if the latest date is less than the current date.
4. If it is, insert new rows into the `habit_results` table for each missing date between the latest date and the current date, with `completed` set to `False`.

Here's how you might implement this in JavaScript:

```javascript
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

// When a user logs in
app.post('/login', async (req, res) => {
  // Authenticate the user
  // ...

  // Get the current date
  const currentDate = moment().format('YYYY-MM-DD');

  // Get the latest date for each of the user's habits
  const habits = await client.sql`
  SELECT habit_id, MAX(date) as latest_date
  FROM habit_results
  WHERE user_id = ${req.user.id}
  GROUP BY habit_id
  `;

  // For each habit, check if the latest date is less than the current date
  for (let habit of habits) {
    let latestDate = moment(habit.latest_date);
    while (latestDate.isBefore(currentDate)) {
      // If it is, insert a new row into the habit_results table for the missing date
      latestDate.add(1, 'days');
      await client.sql`
      INSERT INTO habit_results (date, completed, habit_id)
      VALUES (${latestDate.format('YYYY-MM-DD')}, false, ${habit.habit_id})
      `;
    }
  }

  // Continue with the login process
  // ...
});
```

This script uses the `moment` library to handle dates. It gets the current date and the latest date for each of the user's habits, then loops through each habit and inserts a new row into the `habit_results` table for each missing date.

Please note that this is a basic implementation and might need to be adjusted based on your specific needs and database structure.
*/