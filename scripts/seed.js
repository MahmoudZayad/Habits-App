import  prisma  from "./db"; 

async function main() {
    console.log(`Start seeding ...`);

    for (let user of users) {
        await prisma.user.create({
            data: user,
        });
    }

    for (let habit of habits) {
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
