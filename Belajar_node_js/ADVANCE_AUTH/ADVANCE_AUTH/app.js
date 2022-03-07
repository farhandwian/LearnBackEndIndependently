const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const sessionRoutes = require('./router/sessionRoutes')
const path = require('path')
const PORT = process.env.PORT || 2876

app.use(express.urlencoded({ extended: true })); // New
app.use(express.json()); // New

const viewsPath = path.join(__dirname, './views')
app.set('views', viewsPath)

const publicDirPath = path.join(__dirname, './public')
app.use(express.static(publicDirPath))

app.engine('hbs', exphbs({extname: 'hbs'}))
app.set('view engine', '.hbs');

app.use('', sessionRoutes)

app.listen(PORT, ()=>{console.log(`Server running on PORT ${PORT}`)})