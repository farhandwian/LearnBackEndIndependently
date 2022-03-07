const express= require('express')
const session = require('express-session')
const passport = require('passport')
const sessionController = require('../controllers/sessionController')
const router = express.Router()

const sessionStore = sessionController.storeSession()
router.use(session({
    secret: 'tolol',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

require('../config/passport')
router.use(passport.initialize());
router.use(passport.session());

router.get('/', sessionController.home)
router.get('/login', (req,res)=>res.render('login'))
router.post('/login', passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: 'login-success'}))
router.get('/register', (req, res)=>res.render('register'))
router.post('/register', sessionController.postRegister)

router.get('/protected-route', sessionController.isAuth,  sessionController.protected)
router.get('/logout', sessionController.logout);
router.get('/login-success', sessionController.loginSuccess);
router.get('/login-failure', sessionController.loginFailed);

module.exports = router

