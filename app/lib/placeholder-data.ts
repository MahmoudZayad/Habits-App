import { v4 as uuidv4 } from 'uuid';
import { User, Habit, HabitResult } from './definitions';

export const users:User[] = [
  {
    id: "clsz2fka30000gxr208vvn5pj",
    name: 'Mahmoud Zayad',
    email: 'mahmoudzayad@gmail.com',

  }
];

export const habits:Habit[] = [
  {
    id: uuidv4(),
    user_id: users[0].id,
    title: 'scooby',
    description: 'This is Habit 1',
    color: 'text-red-400', // Red
  },
  {
    id: uuidv4(),
    user_id: users[0].id,
    title: 'dooby',
    description: 'This is Habit 2',
    color: 'text-green-300', // Green
  },
  {
    id: uuidv4(),
    user_id: users[0].id,
    title: 'DOOO',
    description: 'This is Habit 3',
    color: 'text-sky-300', // Blue
  },
];

export const habit_results:HabitResult[] = [
  { date: '2024-02-04', completed: true, habit_id: habits[0].id },
  { date: '2024-02-05', completed: false, habit_id: habits[0].id},
  { date: '2024-02-06', completed: false, habit_id: habits[0].id },
  { date: '2024-02-07', completed: true, habit_id: habits[0].id },
  { date: '2024-02-08', completed: false, habit_id: habits[0].id },
  { date: '2024-02-09', completed: true, habit_id: habits[0].id },
  { date: '2024-02-10', completed: false, habit_id: habits[0].id },
  { date: '2024-02-11', completed: false, habit_id: habits[0].id },
  { date: '2024-02-12', completed: true, habit_id: habits[0].id },
  { date: '2024-02-04', completed: true, habit_id: habits[1].id },
  { date: '2024-02-05', completed: true, habit_id: habits[1].id },
  { date: '2024-02-06', completed: true, habit_id: habits[1].id },
  { date: '2024-02-07', completed: true, habit_id: habits[1].id },
  { date: '2024-02-08', completed: true, habit_id: habits[1].id },
  { date: '2024-02-09', completed: true, habit_id: habits[1].id },
  { date: '2024-02-10', completed: true, habit_id: habits[1].id },
  { date: '2024-02-11', completed: true, habit_id: habits[1].id },
  { date: '2024-02-12', completed: true, habit_id: habits[1].id },
  { date: '2024-02-04', completed: true, habit_id: habits[2].id },
  { date: '2024-02-05', completed: true, habit_id: habits[2].id },
  { date: '2024-02-06', completed: true, habit_id: habits[2].id },
  { date: '2024-02-07', completed: true, habit_id: habits[2].id },
  { date: '2024-02-08', completed: true, habit_id: habits[2].id },
  { date: '2024-02-09', completed: true, habit_id: habits[2].id },
  { date: '2024-02-10', completed: true, habit_id: habits[2].id },
  { date: '2024-02-11', completed: true, habit_id: habits[2].id },
  { date: '2024-02-12', completed: true, habit_id: habits[2].id },
];