const express = require('express')
const cors = require('cors')

const app = express()

const db = require('./app/models')
db.sequelize.sync()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('connect')
})

require('./app/routes/user.routes')(app)

app.listen(3000, () => {
  console.log('Server is listening on port 3000.')
})
