const express = require('express') ;
const app = express();
const bodyparser =  require('body-parser');
var corsOptions = {origin: 'http://localhost:8081'};

// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const db = require("./models");
db.sequelize.sync()
    .then(()=>{
        console.log('synced.db');
    })
    .catch((err)=>{
        console.log('Failed to sync db:'+ err.message);
    });

db.sequelize.sync({forced : true}).then(()=>{
    console.log("Drop and re-sync db.");
});

app.get('/',(req, res)=>{
 res.send('Hello!!');
});

require("./routes/patient.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
  console.log(`server running on the port ${PORT}`)
});