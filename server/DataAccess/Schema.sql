-- ============================
-- CREATE SCHEMA IF NOT EXISTS
-- ============================
CREATE SCHEMA IF NOT EXISTS windmill;

-- Make sure all following tables go into this schema
SET search_path TO windmill;

-- ============================
-- DROP TABLES (in dependency order)
-- ============================
DROP TABLE IF EXISTS alert_command CASCADE;
DROP TABLE IF EXISTS turbine CASCADE;
DROP TABLE IF EXISTS login CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS role CASCADE;

-- ============================
-- ROLE TABLE
-- ============================
CREATE TABLE role (
                      role_id SERIAL PRIMARY KEY,
                      role_name TEXT NOT NULL
);

-- ============================
-- USER TABLE
-- ============================
CREATE TABLE "user" (
                        user_id SERIAL PRIMARY KEY,
                        fname TEXT NOT NULL,
                        lname TEXT NOT NULL
);

-- ============================
-- LOGIN TABLE
-- ============================
CREATE TABLE login (
                       login_id SERIAL PRIMARY KEY,
                       username TEXT NOT NULL UNIQUE,
                       password TEXT NOT NULL,
                       role_id INT NOT NULL,
                       user_id INT NOT NULL,

                       CONSTRAINT fk_login_role
                           FOREIGN KEY (role_id) REFERENCES role(role_id)
                               ON DELETE RESTRICT,

                       CONSTRAINT fk_login_user
                           FOREIGN KEY (user_id) REFERENCES "user"(user_id)
                               ON DELETE CASCADE
);

-- ============================
-- TURBINE TABLE
-- ============================
CREATE TABLE turbine (
                         turbine_id SERIAL PRIMARY KEY,
                         turbine_name TEXT NOT NULL,
                         farm_id INT,
                         timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
                         wind_speed NUMERIC,
                         wind_direction NUMERIC,
                         ambient_temp NUMERIC,
                         rotor_speed NUMERIC,
                         power_output NUMERIC,
                         nacelle_direction NUMERIC,
                         blade_pitch NUMERIC,
                         generator_temp NUMERIC,
                         gearbox_temp NUMERIC,
                         vibration NUMERIC,
                         status TEXT
);

-- ============================
-- ALERT / COMMAND TABLE
-- ============================
CREATE TABLE alert_command (
                               alert_id SERIAL PRIMARY KEY,
                               name TEXT NOT NULL,          -- combined: AlertName + User + Turbine
                               timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
                               description TEXT -- combined: Severity + Message
);