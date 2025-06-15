import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const excercise = sqliteTable('excercise', {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),
    reps: integer('reps').notNull(),
    series: integer('series').notNull(),
    weight: real('weight'),
    trainingId: integer('training_id')
    .references(() => training.id, { onDelete: 'cascade' })
})

export const plan = sqliteTable('plan', {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),
    numTrainings: integer('numTrainings').notNull()
})

export const training = sqliteTable('training', {
    id: integer('id').primaryKey({autoIncrement: true}),
    name: text('name').notNull(),
    numExcercises: integer('numExcercises').notNull(),
    planId: integer('plan_id')
    .references(() => plan.id, {onDelete: 'cascade'})
})

export const trainingSession = sqliteTable('trainingSession', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  date: text('date').notNull(),
  duration: text('duration').notNull(),
  numSeriesCompleted: integer('numSeriesCompleted').notNull(),

  trainingId: integer('training_id')
    .references(() => training.id, { onDelete: 'set null' }),

  trainingPlanId: integer('training_plan_id')
    .references(() => plan.id, { onDelete: 'set null' })
});

export const record = sqliteTable('record', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    excercise: text('excercise').notNull(),
    weight: real('weight'),
    date: text('date').notNull()
})

export type Excercise = typeof excercise.$inferSelect;
export type Plan = typeof plan.$inferSelect;
export type Training = typeof training.$inferSelect;
export type TrainingSession = typeof trainingSession.$inferSelect;
export type Record = typeof record.$inferSelect;