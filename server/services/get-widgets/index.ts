export * from './getWidgets';

//docker run --name widget-app-database -e POSTGRES_PASSWORD=trumpet -p 5432:5432 -d postgres

// docker exec -it widget-app-database psql -U postgres

// CREATE TABLE widgets(id SERIAL PRIMARY KEY,  content VARCHAR NOT NULL);

// docker start widget-app-database

//\dt