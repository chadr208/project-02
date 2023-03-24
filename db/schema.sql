DROP DATABASE IF EXISTS project2_db;

CREATE DATABASE project2_db;

-- CREATE TABLE locations (
--   id SERIAL PRIMARY KEY,
--   name TEXT NOT NULL,
--   address TEXT NOT NULL,
--   latitude FLOAT NOT NULL,
--   longitude FLOAT NOT NULL,
--   rating FLOAT,
--   num_ratings INT,
--   created_at TIMESTAMP DEFAULT NOW(),
--   updated_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE foods (
--   id SERIAL PRIMARY KEY,
--   name TEXT NOT NULL
-- );

-- CREATE TABLE location_foods (
--   id SERIAL PRIMARY KEY,
--   location_id INT REFERENCES locations(id),
--   food_id INT REFERENCES foods(id)
-- );

-- CREATE TABLE dislikes (
--   id SERIAL PRIMARY KEY,
--   location_id INT REFERENCES locations(id),
--   created_at TIMESTAMP DEFAULT NOW()
-- );