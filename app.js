const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
require('./temporary_data_store/index')(app)

app.listen(5003, () => {
    console.log('server is running')
})