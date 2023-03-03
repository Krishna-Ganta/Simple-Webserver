const leveldown = require('leveldown');

class Leveldb {
    constructor(dbPath, options = {}) {
        this.db = leveldown(dbPath);
        this.dbOptions = options;
    }

    init() {
        this.db.open(this.dbOptions, (err) => {
            if (err) {
                throw err
            } else {
                console.log('leveldb init success');
                return this.db;
            }
        })
    }

    close() {
        this.db.close();
    }
}

module.exports = Leveldb;

