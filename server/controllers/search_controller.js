let swag = require('../models/swag');

module.exports = {
    search: (req, res, next) => {
        if(req.query.category) {
            let filteredSwag = swag.filter((val, i, arr) => val.category === req.query.category);
            if(filteredSwag) {
                res.status(200).json(filteredSwag);
            } else {
                res.status(200).json(swag);
            }
        } else {
            res.sendStatus(500);
        }
    }
}