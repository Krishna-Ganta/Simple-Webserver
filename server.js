const config = require('./config.js');
const Leveldb = require('./leveldb.js');
const express = require('express');
const router = require('./routes/');
const app = express();

app.use('/api',router)

let options = {
    createIfMissing: true,
    errorIfExists: true,
    compression: true, // default Snappy compression
    cacheSize: 1 * 1024 * 1024, // size in bytes
    writeBufferSize: 4 * 1024 * 1024, // default is 4MB
    blockSize: 4096, //default is 4KB
    maxOpenFiles: 1000, // default is 1000
    maxFileSize: 2 * 1024 * 1024, // default is 2MB
    errorIfExists: false
};

const db = new Leveldb(config.db_path, options);
db.init()

let port = process.env.PORT || config.port;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})  