const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')
const { readdirSync } = require('fs');
const { join } = require('path');
const run = require('./Config/db')
const app = express();
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await run(); // Ensure MongoDB connection is established before starting the server

    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParse.json({ limit: '10mb' }));

    readdirSync('./Routes').map((file) => {
      const routePath = join(__dirname, 'Routes', file);
      app.use('/api', require(routePath));
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
