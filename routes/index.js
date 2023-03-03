module.exports = (function() {
    const router = require('express').Router();
    
    router.get('/', (req, res) => {
        res.end("Hi");
    });

    return router;
})();