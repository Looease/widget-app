# widget-app
Create and manage widgets. 

This is a full stack application that allows you to create, view and delete widgets. 

Widgets are components that contain text.

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

Assuming you have Node.js and NPM installed, in that location, in Terminal:

`npm install`

When you have installed your dependencies, to launch the application run:

`npm run dev`

The client is configured to run on port `http://localhost:5173/`

## Contributing

You are now ready to run the widget app!

To contribute, please checkout a branch off of that `main` branch and raise a pull request. 

We use Prettier to ensure high quality coding standards. Please run `npm run prettier` in the client and server before each commit.

## Tests

We are using Vitest to test this full stack application. 

In either the `client` or `server` directories, you can run `npm test` to run tests for the application. 


