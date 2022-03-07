const LocalStrategy = require('passport-local').Strategy
const validPassword = require('../lib/passwordUtils').validPassword
const passport = require('passport')
const pool = require('./database').pool

module.exports = function(passport){

    const verifyCallback = (username, password, done) => {
        pool.getConnection((err, connection) =>{
            connection.query("SELECT _id,username_hash,_salt FROM UserTable WHERE username = ?",[username],(err, data) => {
                connection.release()
                if(err) return done(err)

                console.log(data + '\n');
                console.log(Password input : ${password}\nHash database : ${data._hash}\nSalt Database : ${data._salt})

                const isValid = validPassword(password,data._hash,data_salt)

                if(isValid)return done(null,data)
                else return done(null,false)
            })
        })
    }

    const customFields = {
        usernameField : 'uname',
        passwordField : 'pw',
        passReqToCallback : true
    }

    const strategy = new LocalStrategy(customFields, verifyCallback);
    passport.use(strategy)

    passport.serializeUser(function(user, done) {
        console.log("Inside serialize")
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        console.log("Inside desereialize")
        pool.getConnection(function(err, connection) {
            connection.query("SELECT _id,username_hash,_salt FROM UserTable WHERE username = ?", [username],(err, data) => {
                connection.release()
                    if(!err) done(null,data[0])
                    else done(err)
                })
            })
    });
}


