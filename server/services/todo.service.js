var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
const nodemailer = require('nodemailer');


db.bind('todos');
db.bind('users');

var service = {};


service.getAll = getAll;

service.create = create;

service.delete = _delete;

module.exports = service;



function getAll() {
    var deferred = Q.defer();

    db.todos.find().toArray(function (err, todos) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
       

        deferred.resolve(todos);
    });

    return deferred.promise;
}


function create(todoParam) {
    var deferred = Q.defer();

    // validation
    db.todos.findOne(
        { username: todoParam.username },
        function (err, todo) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            createTodo();
            
        });

    function createTodo() {
        // set user object to userParam without the cleartext password
        var todo = todoParam;


        db.todos.insert(
            todo,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                // uncomment to send the mails;

                // sendTodoMail(todo);      
                deferred.resolve();
            });
    }

    return deferred.promise;
}

function sendTodoMail(todo){
    setTimeout(function(){
            db.users.find().toArray(function(err,users){
                if(err) return;
            users.forEach(function(user) {
                    sendMail(user,todo);

                }, this);
            });
    },15*60*1000);

}

function sendMail(user,todo){

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'raj18021997@gmail.com',
        pass: '**'  // put your passoword
    }
});

    var mailOptions = {
    from: '"Project Alpha " <raj18021997@gmail.com>', // sender address
    to:  user.emailId, // list of receivers
    subject: 'New Todo Arrived', // Subject line
    text: todo.text+' created by '+todo.username // plain text body
    // html: '<b>Hello world ?</b>' // html body
};
    

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});

}


function _delete(_id) {
    var deferred = Q.defer();

    db.todos.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}