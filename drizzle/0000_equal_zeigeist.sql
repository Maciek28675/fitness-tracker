CREATE TABLE `excercise` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`reps` integer NOT NULL,
	`series` integer NOT NULL,
	`weight` real,
	`training_id` integer,
	FOREIGN KEY (`training_id`) REFERENCES `training`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `plan` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`numTrainings` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `record` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`excercise` text NOT NULL,
	`weight` real,
	`date` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `training` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`numExcercises` integer NOT NULL,
	`plan_id` integer,
	FOREIGN KEY (`plan_id`) REFERENCES `plan`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `trainingSession` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`duration` text NOT NULL,
	`numSeriesCompleted` integer NOT NULL,
	`training_id` integer,
	`training_plan_id` integer,
	FOREIGN KEY (`training_id`) REFERENCES `training`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`training_plan_id`) REFERENCES `plan`(`id`) ON UPDATE no action ON DELETE set null
);
