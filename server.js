const express = require('express');
const config = require('./config.js');
const db = require('./db.js');
const router = require('./routes/');
const app = express();

app.use('/api', router)

let port = process.env.PORT || config.port;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
}) 

process.on("SIGINT",async () => {
    await db.close();
    process.exit(0);
})