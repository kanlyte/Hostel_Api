const express = require('express')
const app = express();
const tasks = require('./routes/tasks')
const ConnectDB = require('./db/connect');

const port = 5001;

app.use(express.json());

app.use('/hostel/', tasks)


ConnectDB();

app.listen(port, console.log(`server started on port: ${port}.......`))