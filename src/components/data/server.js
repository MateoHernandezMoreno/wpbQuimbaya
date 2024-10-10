const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

//middleeare

app.use(cors());
app.use(bodyParser());

//conectar a MongDB
mongoose.connect('mongodb://localhost:27017formdb',{
    unseNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected")).chatch(err => console.log(err));

//modelo de base de datos

const  Client = mongoose.model("Client", new mongoose.Schema({
    name: String,
    lastName: String,
    nationality: String,
    document: String,
    docnumber: Number,
    email: String,
    adrees: String,
    phone: Number,
    numPersons: Number,
    room: String,
    nights: Number,
    numRoom: Number,
    observations: String,
}));

//ruta para manejar las peticiones POST

app.post('/api/form', async (req, res)=>{
    const {name, 
        lastName, 
        nationality, 
        document, 
        docnumber, 
        email, 
        adrees, 
        phone, 
        numPersons, 
        room, 
        nights, 
        numRoom, 
        observations} =req.body;
    const newClient = new Client({
        name, 
        lastName, 
        nationality,
         document, 
         docnumber, 
         email, 
         adrees, 
         phone, 
         numPersons, 
         room, 
         nights, 
         numRoom, 
         observations});

         await newClient.save();
         res.json({success: true, data: newClient});
});

app.listen(5000, ()=>{
    console.log('Server is running on port 5000')
});