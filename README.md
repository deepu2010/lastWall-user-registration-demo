LastWall User Registration Demo Application

The LastWall User Registration Demo application is a TypeScript and React based user registration system. It is designed to secure user information by applying complex password rules and hashing user passwords at the backend. This document provides a detailed explanation of the application's structure, functionality, and underlying technology.

## Installation

To get started with the project, follow the steps below:

### Client

1. Navigate to the `client` folder:
cd client

2. Install dependencies:
npm install

3. Start the react project
npm start

1. Navigate to the `server` folder:
cd server

3. Build the TypeScript files:
tsc --esModuleInterop server.ts

4. Start the server:
node server.js

5. Database setup

- Install MySQL on your machine.

- Create a new database using your preferred MySQL client.

- Import the SQL schema:
- Open your preferred MySQL client and connect to the newly created database.
- Execute the SQL statements in the `server/login.sql` file to create the necessary table.

6. Database Configuration

In order to connect the server to the database, follow these steps:

1. Open the `server/server.ts` file.

2. Locate the database configuration section and update the following details:
- Host: Specify the host of your MySQL server.
- User: Specify the username for your MySQL server.
- Password: Specify the password for your MySQL server.
- Database: Specify the name of the database you created in the previous step.


