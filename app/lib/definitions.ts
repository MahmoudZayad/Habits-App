export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    habits: Habit[];
  };

export type Habit = {
    id: string;
    title: string;
    description: string; 
    color: string; // Color of habit name and checks
    startDate: Date; // Date habit was started
    endDate: Date; // Date habit was deleted
    results: boolean[]; 
}


// The structure you have defined is well-suited for an object-oriented programming language or a document-oriented database like MongoDB, but it's not ideal for a relational database like PostgreSQL. In a relational database, data is typically normalized to reduce redundancy and improve data integrity.

// Here's how you might structure your data for PostgreSQL:

// 1. `users` table:

// ```sql
// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255),
//   email VARCHAR(255) UNIQUE,
//   password VARCHAR(255)
// );
// ```

// 2. `habits` table:

// ```sql
// CREATE TABLE habits (
//   id SERIAL PRIMARY KEY,
//   title VARCHAR(255),
//   description TEXT,
//   color VARCHAR(7),
//   start_date DATE,
//   end_date DATE,
//   user_id INTEGER,
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );
// ```

// 3. `habit_results` table:

// ```sql
// CREATE TABLE habit_results (
//   id SERIAL PRIMARY KEY,
//   date DATE,
//   completed BOOLEAN,
//   habit_id INTEGER,
//   FOREIGN KEY (habit_id) REFERENCES habits(id)
// );
// ```

// In this structure:

// - The `users` table stores user information. Each user has a unique `id`.
// - The `habits` table stores habit information. Each habit has a `user_id` that links it to a user in the `users` table.
// - The `habit_results` table stores the results of each habit on each date. Each result has a `habit_id` that links it to a habit in the `habits` table.

// This structure allows you to store multiple habits for each user, and multiple results for each habit, in a way that's efficient and scalable for a relational database.