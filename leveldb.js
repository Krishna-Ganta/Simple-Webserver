const leveldown = require('leveldown');
const path = require("path");

class Leveldb {
    constructor(dbPath, options = {}) {
        dbPath = path.resolve(__dirname, dbPath)
        this.db = leveldown(dbPath);
        this.dbOptions = options;
    }

    init() {
        this.db.open({options: this.dbOptions, errorIfExists: false}, (err) => {
            if (err) {
                throw err
            } else {
                console.log('db successfully initialized');
                return this.db;
            }
        })
    }

    close() {
        this.db.close();
    }
}

module.exports = Leveldb;

