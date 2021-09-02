const session = require('express-session'),
    Store = require('express-mysql-session');
    
let options = {
    host:"localhost",
    user:"root",
    password:"123456",
    port:"3306",
    database:"myblog",
}

module.exports = session({
    name:'sid',
    secret:'abc',
    resave: false,
    saveUninitialized: true,
    store:new Store(options),
    cookie:{
        maxAge:1000*60*60*24
    }
})
