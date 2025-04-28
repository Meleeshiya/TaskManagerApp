# Task Manager System

## Overview

The Task Manager System is designed to help caseworkers efficiently create, view, update, and delete tasks. This application consists of two parts:

- **Backend**: Built using **Java** with **Spring Boot** to provide RESTful API services.
- **Frontend**: Built using **React.js** with **Context API** for state management and **Bootstrap** for styling.

This full-stack application allows for the management of tasks with features like adding new tasks, viewing tasks, editing task details, and deleting tasks.

## Project Structure

## 🛠 Technologies Used

### Backend

- **Java**
- **Spring Boot** (REST API)
- **Spring Data JPA** (Database interaction)
- **MySQL** (Database)

### Frontend

- **React.js** (UI framework)
- **React Router** (Routing)
- **Bootstrap 5** (Styling)
- **Context API** (State management)

---

##  Getting Started

### Backend Setup (Spring Boot)

1. Clone the repository:

```bash
git clone <https://github.com/Meleeshiya/TaskManagerApp>
cd task-manager-backend

2. Setup MySQL Database:
SQL
CREATE DATABASE task_manager_db;

CREATE TABLE task (
  caseid INT AUTO_INCREMENT PRIMARY KEY,
  casenumber VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('TO_DO', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CLOSED', 'CANCELLED') NOT NULL,
  createddate DATETIME NOT NULL
);

3. Configure application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/task_manager_db
spring.datasource.username=root
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080

Run the backend:

4.You can run the backend using Maven:
./mvnw spring-boot:run

Frontend Setup (React)
Navigate to the frontend folder:

cd task-manager-frontend
Install dependencies:
npm install
Start the React app:
npm start
The frontend will now be running on http://localhost:3000.


## API Endpoints
The backend provides the following API endpoints:

Method	    Endpoint	                                         Description
GET	        /case-manager-api/cases	                          Fetch all cases
GET	        /case-manager-api/case/{id}	                      Fetch a case by ID
POST	      /case-manager-api/addCase	                        Create a new case
PATCH	     /case-manager-api/updatecasestatus/{id}/status     Update a case status
DELETE	  /case-manager-api/deletecase/{id}	                  Delete a case

## Features
Add new tasks (cases)

View all tasks

Edit task details

Update task status

Delete tasks

Responsive UI with Bootstrap

## Troubleshooting
If you encounter any issues:

Ensure the backend is running at http://localhost:8080.

Ensure the frontend is running at http://localhost:3000.

Make sure the MySQL Database is set up correctly and matches the configuration in application.properties.
