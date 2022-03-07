const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const pool = require('../config/database').pool;
const option = require('../config/database').optionForSession
const genPassword = require('../lib/passwordUtils').genPassword

require('../config/passport')

exports.storeSession = () => {
    let sessionStore = new MySQLStore(option,pool);
    return sessionStore
}

exports.home = (req, res) => {
    console.log(`Client Session ID : ${req.session.id}`)
    res.send('<h1>Home</h1><p>Please <a href="/login">register</a></p>');
}

exports.postRegister = (req, res, next) => {
    const saltHash = genPassword(req.body.passreg)
    const username = req.body.emailreg
    const salt = saltHash.salt
    const hash = saltHash.hash

    pool.getConnection(function(err,connection){
        connection.query("INSERT INTO UserTable (_id,username,_hash,_salt) VALUES ('3','"+username+"','"+hash+"','"+salt+"')", (err, data)=>{
            connection.release()
            if(err) console.log(err)
            else console.log("Your data has been inserted")
            console.log(data)
        })
    })
    res.redirect('/register')
}

exports.isAuth = (req, res, next) => {
    if(req.isAuthenticated()) next()
    else res.status(401).json({ mgs: 'You are not authenticated in this section route' })
}

exports.protected = (req, res) => {
    res.send('You made it to the route.');
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/protected-route');
}

exports.loginSuccess = (req, res) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
}

exports.loginFailed = (req, res) => {
    res.send('You entered the wrong password.');
}
