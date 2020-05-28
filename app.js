const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const passport = require('passport')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes= require('./routes/category')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const orderRoutes = require ('./routes/order')
const positionRoutes = require ('./routes/position')
const app = express()

mongoose.connect(keys.mongoURI,
{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true} )
   .then(()=>console.log('MongoDB connected'))
   .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)


app.use(require('morgan')('dev'))
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/auth',authRoutes)
app.use('/api/analytics',analyticsRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/position',positionRoutes)
app.use(require('cors')())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        )
    })
}

module.exports = app