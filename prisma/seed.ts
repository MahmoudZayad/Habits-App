import prisma from '../app/utils/db';

import { habits, habit_results } from '../app/lib/placeholder-data';

async function main() {
    for (const habit of habits) {
        await prisma.habit.create({
            data: habit
        });
    }
    for (const habitResult of habit_results) {
        await prisma.habitResult.create({
            data: habitResult
        });
    }
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