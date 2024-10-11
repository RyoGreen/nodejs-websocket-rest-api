# nodejs-websocket-rest-api

# How to Set Up

## RESTful API

Ensure that [Node.js](https://nodejs.org/) is installed on your machine.

To set up the RESTful API, follow these steps:

```bash
cd rest_api
npm install
node app.js
```

## WebSocket

To set up the WebSocket server, follow these steps:

```bash
cd websocket
npm install
node server.js
```

# Architecture

## RESTful API

The RESTful API is designed to handle HTTP requests for resource management. It uses the "Express.js" framework to
define various endpoints. Each endpoint is linked to specific handler functions to process incoming requests
efficiently. The API follows REST principles, allowing clients to interact with resources through standard HTTP methods:

- GET: Retrieve resource data
- POST: Create a new resource
- PUT: Update an existing resource
- DELETE: Remove a resource

The API structure allows for easy addition of new endpoints as needed, providing flexibility for future functionality.

Currently, during the pre-assessment phase, data is stored in memory using arrays.

## WebSocket

The WebSocket server facilitates real-time, bidirectional communication between clients. It utilizes the "ws" library to
manage connections and messages. When a client connects, the server listens for incoming messages and broadcasts them to
all other connected clients, ensuring all users receive updates instantly.

The architecture supports the following features:

- Multiple Connections: The server can handle multiple client connections simultaneously.
- Message Broadcasting: Messages received from one client are sent to all other connected clients, allowing for
  real-time updates. The server can also verify messages through logs, providing a record of all communications.

# Design Decisions

- Frameworks Used:

  - Express.js: Selected for the RESTful API to provide a robust and scalable routing system.
  - ws: Chosen for the WebSocket server for its simplicity and effectiveness in handling WebSocket connections.

- Request Handling:

  - The RESTful API is structured with clear separation of concerns, using dedicated handler functions for each
    endpoint.This design improves code maintainability and readability.
  - Integration with databases can be enhanced to support data persistence. Currently, the RESTful API stores data in
    memory using arrays; this choice is made for simplicity during the pre-assessment phase. As the amount of data
    increases and requires better management, transitioning to a database will be beneficial in the future.

.

# Future Extensions

- For RESTful API:

  - New endpoints can be added to extend functionality, such as implementing authentication using JWT. CORS can also be
    configured to allow cross-origin requests as needed.

  - Integration with databases can be enhanced to support data persistence. Currently, the RESTful API stores data in
    memory using arrays; however, there are plans to transition to using a database for this purpose in the future.

- For WebSocket Server:

  - Channels or rooms can be implemented to allow specific groups of clients to communicate with each other, enhancing
    the functionality of the server.

  - User login functionality will be added to allow for personalized user experiences, enabling features like message
    history and user presence indicators. To implement these features effectively, a database will need to be integrated
    to store user information and message histories.

  - The server could also support sharing various types of information, including not only messages but also files and
    audio data.
