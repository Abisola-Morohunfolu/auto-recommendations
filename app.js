const express = require("express");
const { pool } = require("./db/db");
const issues = require("./routes/issues");
const app = express();

const port = process.env.PORT || 8000;

// Graceful shutdown
process.on("SIGINT", async () => {
  try {
    await pool.end();
    console.log("Pool has ended");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown", error);
    process.exit(1);
  }
});

app.use(express.json());

app.use("/api/v1/issues", issues);

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
