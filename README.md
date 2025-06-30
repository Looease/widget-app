# widget-app
Create and manage widgets. 

This is a full stack application that allows you to create, view and delete widgets. 

Widgets are components that contain text.

You can see a recording of the application below: 

https://github.com/user-attachments/assets/e15ee4b4-9518-4e75-b2d5-2a080eaa57ef

### Stack
The frontend is built with React/Typescript using Vite.

The backend is build with Node and Express.

The database is PostgresSQL.

## Running widget-app

In a location of your choice, in a bash, zsh or powershell Terminal:

`git clone git@github.com:Looease/widget-app.git`

### Set up the server 

From the root of the repository, `cd` into the `server` directory.

We are using Docker to run the backend and create a local database.

Assuming you have Docker on your machine, open the Docker Daemon then run:

`npm run docker`

This script initiates Docker containers for the database and server code and inserts an empty `widgets` table into the database.

You can view your server up and runnning on port `http:/localhost:8000/`

### Set up the client

From the root of the repository, `cd` into the `client` directory.

Assuming you have Node.js and NPM installed, in that location, in your terminal run:

`npm install`

When you have installed your dependencies, to launch the application run:

`npm run dev`

The client is configured to run on port `http://localhost:5173/`

## Contributing

You are now ready to run the widget app!

To contribute, please checkout a branch off of `main` and raise a pull request. 

We use Prettier to ensure high quality coding standards. Please run `npm run prettier` in the client and server before each commit.

### Tests

We are using Vitest to test this full stack application. 

In either the `client` or `server` directories, you can run `npm test` to run tests for the application. 

You can't run tests using Docker at the moment. 

## Trade offs and future iterations 

### Increase test coverage 
- Add more unit testing - I would add more test coverage for get requests and hooks. 
- Integration testing for the server - I would add integration tests to test data is correctly created/deleted from the DB.
- Browser testing - I would install playwright to conduct end to end browser tests.
- Additional cross browser testing. Currently we just support Google Chrome for this app but I would like to expand that to include Safari/Firefox etc. The app will run in these browsers but styling may be impacted.

## Dockerise the whole app
- Right now the server can be pulled from Docker images but the frontend can't

## Migrate package manager to pnpm 
- pnpm is faster and more efficient than npm

## Libraries I would use
- Tanstack query for handling data fetching. Tanstack query provides out of the box data fetching and caching which can improve performance and prevent re-renders. 

## Deploy the full stack app
- I would deploy this app using Netlify. Netlify has a simple CI/CD process for deploying web applications and we can use serverless functions to deploy the server code.
- I would use Supabase to deploy my database. 
- I would implement CI/CD deployment and testing pipelines to handle testing and deploying the app. 

## Trade offs 
- I used a PostgreSQL database because the database is defined and unlikely to change. I would consider using a MongoDB database if the data was more dynamic. 



