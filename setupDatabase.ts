// setupDatabase.ts
import { sql } from 'drizzle-orm';

export const setupDatabase = async (db: any) => {
  // Create plan table
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS plan (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      numTrainings INTEGER NOT NULL
    );
  `);

  // Create training table
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS training (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      numExcercises INTEGER NOT NULL,
      plan_id INTEGER,
      FOREIGN KEY(plan_id) REFERENCES plan(id) ON DELETE CASCADE
    );
  `);

  // Create excercise table
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS excercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      reps INTEGER NOT NULL,
      series INTEGER NOT NULL,
      weight REAL,
      training_id INTEGER,
      FOREIGN KEY(training_id) REFERENCES training(id) ON DELETE CASCADE
    );
  `);

  // Create trainingSession table
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS trainingSession (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      duration TEXT NOT NULL,
      numSeriesCompleted INTEGER NOT NULL,
      training_id INTEGER,
      training_plan_id INTEGER,
      FOREIGN KEY(training_id) REFERENCES training(id) ON DELETE SET NULL,
      FOREIGN KEY(training_plan_id) REFERENCES plan(id) ON DELETE SET NULL
    );
  `);

  // Create record table
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS record (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      excercise TEXT NOT NULL,
      weight REAL,
      date TEXT NOT NULL
    );
  `);

  console.log('Database tables created successfully.');
};
