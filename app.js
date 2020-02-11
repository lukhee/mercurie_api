const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const helmet = require("helmet")
const compression = require("compression")

const employerRoute = require("./routes/employeeRoute")
const authRoute = require("./routes/authRoute.js")
const productRoute = require("./routes/productRoute")
const {PORT} = require('./config')
const mongooseConnection = require('./uti/db')
const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // parse application/json


app.use('/auth', authRoute)
app.use('/', employerRoute)
app.use('/', productRoute )

app.use((req, res, next) => {
    let err = new Error("page not found")
    err.status = 400
    throw err
})

app.use((error, req, res, next) => {
    if (error.status == undefined) {
        res.status(500)
    } else {
        res.status(error.status)
    }
    res.json({ message: error.message })
})

mongooseConnection()

app.listen(PORT, () => {
    console.log(`app listen at port ${PORT}`)
})