let swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        if(req.query.id) {
            let index = req.session.user.cart.findIndex((val, i, arr) => val.id === req.query.id);
            if(index !== -1) {
                res.status(200).json(req.session.user);
            } else {
                let index2= swag.findIndex((val, i, arr) => val.id == req.query.id);
                req.session.user.cart.push(swag[index2]);
                req.session.user.total+=swag[index2].price;
                res.status(200).json(req.session.user);
            }
        } else {
            res.sendStatus(400);
        }
    },
    remove: (req, res, next) => {
        if(req.query.id) {
            let index = req.session.user.cart.findIndex((val, i, arr) => val.id == req.query.id);
            if(index!==-1) {
                req.session.user.cart.splice(index, 1);
                res.status(200).json(req.session.user);
            }
        } else {
            res.sendStatus(400)
        }
    },
    checkout: (req, res, next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).json(req.session.user);
    }
}