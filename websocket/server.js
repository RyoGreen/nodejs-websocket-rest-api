const WebSocket = require("ws");

function createWebSocketServer(port) {
  try {
    const server = new WebSocket.Server({ port });

    server.on("connection", (socket) => {
      socket.on("message", (data) => {
        // Broadcast the message to all other clients
        server.clients.forEach((client) => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            try {
              client.send(data);
              console.log(`Sent message to client: ${data}`);
            } catch (sendError) {
              console.error(`Error sending message to client: ${sendError.message}`);
            }
          }
        });
      });

      socket.on("close", () => {
        // Add necessary processing when the client disconnects here if needed
      });

      socket.on("error", (socketError) => {
        console.error(`Client socket error: ${socketError.message}`);
      });
    });

    server.on("error", (serverError) => {
      console.error(`Server error: ${serverError.message}`);
    });

    console.log(`WebSocket server started on ws://localhost:${port}`);
    return server;
  } catch (error) {
    console.error(`Failed to create WebSocket server: ${error.message}`);
    return null;
  }
}

// Start the server on port 8080
const wsServer = createWebSocketServer(8080);
if (!wsServer) console.error("WebSocket server could not be started.");
