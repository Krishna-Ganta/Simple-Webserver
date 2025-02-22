module.exports = (function() {
    const router = require('express').Router();
    const db = require('../db.js');
    
    router.get('/all', async (req, res) => {
        key = req.params.key;

        const results = await db.iterate(seek = key);

        res.send(results);
    });

    router.post('/store', (req, res) => {
        let input = req.body;
        for (let key in input) {
            db.put(key, input[key])
        }

        res.end("Stored value");
    });

    return router;
})();