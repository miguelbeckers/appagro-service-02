const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

const deviceRoutes = require('./routes/deviceRoutes')
app.use('/device', deviceRoutes)

const measurementRoutes = require('./routes/measurementRoutes')
app.use('/measurement', measurementRoutes)

const USER = process.env.USER
const PASSWORD = encodeURIComponent(process.env.PASSWORD)

mongoose
  .connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.joum4e5.mongodb.net/appagro?retryWrites=true&w=majority`)
  .then(()=>{
    console.log("conectado ao mongoDB")
  })
  .catch((error) => console.log(error))
app.listen(3000)