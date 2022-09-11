const express = require('express');
const cors = require('cors'); // cors proporciona middleware Express para habilitar CORS con varias opciones.
const app = express(); //api rest


var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(express.json()); // body-parser
app.use(express.urlencoded({extended: true}));
const db = require('./models');
db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log('conectado a mongo');
}).catch((error)=>{
    console.log('No se puede conectar a mongo: '+error);
    process.exit;
});

app.get("/", (req, res) => {
    res.json({ message: "Bienvenidos a mi App en nodejs" });
  });

require("./routes/datospersonales.routes")(app);



const PORT = process.env.PORT || 8081;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}.`);

});