# Task Management Server

This is a simple Task Management API built with Node.js, Express, and MongoDB. 
The API allows users to manage tasks with basic functionalities like creating, updating, deleting, and retrieving tasks.

## Features

- **User Authentication**: Secure user registration and login.
- **Task Management**: Create, read, update, and delete tasks.
- **Validation**: Request validation with Joi and error handling.
- **Relationships**: Link tasks to specific users using MongoDB references.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or MongoDB Atlas)
- Postman (for testing API endpoints)

## Installation
Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Rewan-Adel/Task-Manager.git
```
### 2.Navigate into the project directory:
   ```bash
   cd Task-Manager
   ```
###  3. Set Up Environment Variables

Create a .env file in the root directory and add the following:

   ```bash
   PORT=port
   MONGODB_URI= your_db_URI
   JWT_SECRET=your_secret_key
   ```

### 4.Install the dependencies:
   ```bash
   npm install
   ```
### 5.Running the Server
After the installation is complete, you can start the server by running:
   ```bash
   npm start
   ```


