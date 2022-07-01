const express = require("express");
const app = express();
const { Hostel } = require('./models/task')
const { addhostel, registeruser, registeradmin, pendinghostel, edithostel, confirmedhostel, singlehostel, deletehostel } = require('./routes/tasks')
const ConnectDB = require("./db/connect");
const cors = require("cors");
const port = 5008;

app.use(cors); //i also put cors like to access cross origin sites
app.use(express.json());

//login apis
app.use("/api/v6/",registeradmin)
app.use("api/v6/",registeruser)



// hostel apis
app.get('/hostel/:id',function(req,res){
    fetchid = req.params.id;
    Hostel.find(({id:fetchid}), function(err, val){
        res.send(val);
    })
} )
app.use("/api/v6/", addhostel);
app.use("api/v6/", confirmedhostel);
app.use("/api/v6/",pendinghostel);
app.use("api/v6/",edithostel);
app.use("api/v6/", singlehostel);
app.use("api/v6/", deletehostel);

//database connectivity
ConnectDB();

app.listen(port, console.log(`server started on port: ${port}.......`));
