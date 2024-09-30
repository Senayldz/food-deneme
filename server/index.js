const express = require('express')
const app = express()
const port = process.env.PORT || 6001
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config()

//middleware
app.use(cors())
app.use(express.json())

//mongodb config with mongoose
// senayildiz409 0vYvS2g1uhTOBSWi
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@client.3hfal.mongodb.net/?retryWrites=true&w=majority&appName=client`)
    .then(() => console.log("mongodb connected"))
    .catch((error) => console.log("Error:", error));

//import routes
const menuRoutes = require('./api/routes/menuRoutes')
const cartRoutes = require('./api/routes/cartRoutes')
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})