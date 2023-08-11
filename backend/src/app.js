const express = require('express')
const app = express()
const port = process.env.port || 4000;
const cors=require('cors')
require('./db/conn')
const router = require('./routes/route')

app.use(cors());
app.use(express.json());
app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
