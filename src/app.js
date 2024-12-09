require('dotenv').config()
const express = require('express')
const log_request = require('./middleware/logs')
const usersRoute = require('./routes/users')
const app = express()
const PORT = process.env.PORT

app.use(log_request)
app.use(express.json())
app.use('/users', usersRoute)

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}..`)
})