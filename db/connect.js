const { Client } = require("pg");

let client;

function connectToDatabase() {
  if (!client) {
    client = new Client({
      host: "localhost",
      user: "postgres",
      password: " bar",
      database: "node_recommendations",
      port: 5432, // default port
    });
  }

  return client
    .connect()
    .then(() => {
      console.log("Connected to PostgreSQL");
      return client;
    })
    .catch((err) => {
      console.error("Connection error", err.stack);
      throw err; // Re-throw the error so it can be handled if needed
    });
}

function endDatabaseConnection() {
  if (client) {
    return client
      .end()
      .then(() => {
        console.log("PostgreSQL connection closed");
        client = null; // Reset the client
      })
      .catch((err) => {
        console.error("Error closing connection", err.stack);
        throw err;
      });
  } else {
    console.warn("No active PostgreSQL connection to close.");
  }
}

module.exports = { connectToDatabase, endDatabaseConnection };
