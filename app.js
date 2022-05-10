const express = require('express')
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect');

const port = 5001;

app.use(express.json());

app.use('/hostel/', tasks)


connectDB();

app.listen(port, console.log(`server started on port: ${port}.......`))