var config = require('config.json');
var express = require('express');
var router = express.Router();
var todoService = require('services/todo.service');

// routes

router.post('/register', register);
router.get('/', getAll);


router.delete('/:_id', _delete);

module.exports = router;

function register(req, res) {
    todoService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    todoService.getAll()
        .then(function (todos) {
            res.send(todos);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}




function _delete(req, res) {
    todoService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}