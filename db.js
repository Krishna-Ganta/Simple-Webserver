const config = require('./config.js');
const leveldb = require('./leveldb.js')

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

const db = new leveldb(config.db_path);

(async () => {
    try {
        await db.init();
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
})();

module.exports = db;