let users = require('../models/users');

let id = 1;

module.exports = {
    login: (req, res, next) => {
        
        // for(let i = 0; i < users.length; i++) {
            // if(users[1].username === req.body.username && users[1].password === req.body.password) {
            //     console.log('got here');
            //     req.session.user.username = req.body.username;
            //     res.status(200).json(req.session.user);
            // }
        // }
        // res.sendStatus(500);
        // res.sendStatus(200);
        let index = users.findIndex((val, i, arr) => val.username === req.body.username && val.password === req.body.password);
        console.log(index);
        if(index !== -1) {
            req.session.user.username = req.body.username;
            res.status(200).json(req.session.user);
        } else {
            res.sendStatus(500);
        }

    },
    register: (req, res, next) => {
        users.push({
            id: id,
            username: req.body.username,
            password: req.body.password
        });
        id++;
        req.session.user.username = req.body.username;
        res.status(200).json(req.session.user);
    },
    signout: (req, res, next) => {
        req.session.destroy();
        res.json(req.session);
    },
    getUser: (req, res, next) => {
        res.status(200).json(req.session.user)
    }
}