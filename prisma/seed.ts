import prisma from '../app/utils/db'; 
import { habits, habit_results } from '../app/lib/placeholder-data';

async function main() {
    console.log(`Start seeding ...`);

    for (let habit of habits) 
        console.log(habit);
    {
        await prisma.habit.create({
            data: habit,
        });
    }

    for (let habitResult of habit_results) {
        await prisma.habitResult.create({
            data: habitResult,
        });
    }

    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
