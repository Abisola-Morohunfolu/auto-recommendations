const express = require("express");
const { connectToDatabase, endDatabaseConnection } = require("./db/connect");
const app = express();

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    endDatabaseConnection();
  } catch (error) {
    console.log(error);
  }
};

start();
