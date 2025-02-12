const leveldown = require('leveldown');
const path = require("path");

class leveldb {
    constructor(dbPath, options = {}) {
        dbPath = path.resolve(__dirname, dbPath)
        this.db = leveldown(dbPath);
        this.dbOptions = options;
    }

    async init() {
        return new Promise((resolve, reject) => {
            this.db.open({options: this.dbOptions, errorIfExists: false}, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('db successfully initialized');
                    resolve(this.db);
                }
            });
        });
    }

    async put(key, value) {
        return new Promise((resolve, reject) => {
            this.db.put(key, value, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`Saved key: ${key}`);
                }
            });
        });
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.db.get(key, (err, value) => {
                if (err) {
                    if (err.notFound) {
                        resolve(null);
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(value.toString());
                }
            });
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.db.del(key, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`Deleted key: ${key}`);
                }
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Database closed');
                    resolve();
                }
            });
        });
    }

}

module.exports = leveldb;

