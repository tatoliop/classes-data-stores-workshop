## Preliminaries

### Pull images from both compose files

`docker-compose -f docker-compose-mongo.yml pull`

`docker-compose -f docker-compose-neo4j.yml pull`

### Create the flask app for mongodb

`docker-compose -f docker-compose-mongo.yml build`

## MongoDB

### Run the stack

`docker-compose -f docker-compose-mongo.yml up`

The stack contains the `Mongo-explorer` service to visualize the collections and documents in the database. The explorer is available using the url: `localhost:8081`.

The flask app uses the url `localhost:8080/swagger` to provide a swagger UI for the available request endpoints with examples.

## Neo4j

### Run the stack

`docker-compose -f docker-compose-neo4j.yml up`

Neo4j provides a UI for visualization and queries using the url: `localhost:7474`.

