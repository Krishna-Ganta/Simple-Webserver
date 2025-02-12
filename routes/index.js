module.exports = (function() {
    const router = require('express').Router();
    const db = require('../db.js');
    
    router.get('/all', (req, res) => {
        let data = {};
        const iterator = db.iterator({ keyAsBuffer: false, valueAsBuffer: false });

        const next = () => {
            iterator.next((err, key, value) => {
                if (err) {
                    return res.status(500).json({ error: 'Iterator error', details: err.message });
                }
    
                if (!key) {
                    return iterator.end(() => res.json(data));
                }
    
                if (key !== 'auto_increment_id') {
                    data.push({ key, value });
                }
    
                next();
            });
        };
    
        next();
        res.send(data);
    });

    router.post('/store', (req, res) => {
        console.log(req.body)

        res.end("Stored value");
    });

    return router;
})();