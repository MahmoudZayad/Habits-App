const { db } = require('@vercel/postgres');
const {
    users,  
    habits,
    habit_results,
} =  require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the users table
        const createTable = await  client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `;
        
        console.log(`Created users' table`);

        // Insert the users into the table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
                INSERT INTO users (id, name, email, password)
                VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
            `;
            }),
        );
    
        console.log(`Seeded ${insertedUsers.length} users`);
        return { 
            createTable,
            users: insertedUsers,
        };
        
    } catch (error) {
        console.error('Error seeding users!', error);
        throw error;
    }
}

async function seedHabits(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        
        // Create the habits table
        const createTable = await client.sql`
        Create TABLE IF NOT EXISTS habits (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            color VARCHAR(25) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        `;
    
        console.log(`Created habits' table`);

        // Insert the habits into the table
        const insertedHabits = await Promise.all(
            habits.map(async (habit) => {
                return client.sql`
                INSERT INTO habits (id, user_id, title, description, color)
                VALUES (${habit.id}, ${habit.user_id}, ${habit.title}, ${habit.description}, ${habit.color})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
        );
        
        console.log(`Seeded ${insertedHabits.length} habits`);

        return {
            createTable,
            habits: insertedHabits,
        };

    } catch (error) {
        console.error('Error seeding habits!', error);
        throw error;
    }
}

async function seedHabitResults(client) { 
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        
        // Create the habit_results table
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS habit_results (
            date DATE NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT FALSE,
            habit_id UUID NOT NULL,
            PRIMARY KEY (date, habit_id),
            FOREIGN KEY (habit_id) REFERENCES habits(id)
        );
        `;
    
        console.log(`Created habit_results' table`);

        // Insert the habit_results into the table
        const insertedHabitResults = await Promise.all(
            habit_results.map(async (habitResult) => {
                return client.sql`
                INSERT INTO habit_results (date, completed, habit_id)
                VALUES (${habitResult.date}, ${habitResult.completed}, ${habitResult.habit_id})
                ON CONFLICT (date, habit_id) DO NOTHING;
            `;
        }),
        );
        
        console.log(`Seeded ${insertedHabitResults.length} habit_results`);

        return {
            createTable,
            habit_results: insertedHabitResults,
        };
    } catch (error) {
        console.error('Error seeding habit_results!', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedHabits(client);
    await seedHabitResults(client);

    await client.end();
}

main().catch((error) => {
    console.error('Error seeding database!', error);
    process.exit(1);
});