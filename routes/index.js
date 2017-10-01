'use strict';

module.exports = function (app) {
    app.get('/', function(req, res, next) {
        var page = '<html><head><title>learningweb-fe</title></head><body>Welcome</body></html>';
        res.send(page);
    });
};