-- Drop the database if it already exists
DROP DATABASE IF EXISTS task_manager_db;

-- Create a new database
CREATE DATABASE task_manager_db;

-- Use the new database
USE task_manager_db;

-- Create the table for storing tasks (cases)
CREATE TABLE task (
  caseid INT AUTO_INCREMENT PRIMARY KEY,          -- caseid as the primary key
  casenumber VARCHAR(255) NOT NULL UNIQUE,        -- casenumber with unique constraint
  title VARCHAR(255) NOT NULL,                    -- task title
  description TEXT,                               -- optional description
  status ENUM('TO_DO', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CLOSED', 'CANCELLED') NOT NULL,  -- status enum
  createddate DATETIME NOT NULL                   -- created date
);

-- Inserting demo data into the task table
INSERT INTO task (casenumber, title, description, status, createddate) 
VALUES
  ('T001', 'Review Documents for Case 001', 'Review all the legal documents for case 001.', 'TO_DO', '2025-05-01 09:00:00'),
  ('T002', 'Court Hearing Preparation for Case 002', 'Prepare all evidence and documents for court hearing in case 002.', 'IN_PROGRESS', '2025-05-03 10:00:00'),
  ('T003', 'Client Meeting for Case 003', 'Meet with the client to discuss case 003 details and next steps.', 'ON_HOLD', '2025-05-05 14:00:00'),
  ('T004', 'Complete Final Report for Case 004', 'Complete the final report based on the reviewed documents for case 004.', 'COMPLETED', '2025-04-28 11:30:00'),
  ('T005', 'Close Case 005', 'All the work for case 005 has been completed. Closing the case now.', 'CLOSED', '2025-04-25 16:00:00'),
  ('T006', 'Investigate Client for Case 006', 'Investigating client-related issues for case 006.', 'CANCELLED', '2025-04-22 13:00:00');
