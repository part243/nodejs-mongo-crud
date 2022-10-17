const express = require('express');
const cors = require('cors'); // cors proporciona middleware Express para habilitar CORS con varias opciones.
const app = express(); //api rest


var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(express.json()); // body-parser
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//app.set('view engine', 'ejs'); // install ejs npm install ejs
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
    res.json({ ok:true, message: "Bienvenidos a mi App en nodejs" });
  });

require("./routes/datospersonales.routes")(app);



const PORT = process.env.PORT || 8081;


app.listen(PORT,'localhost', ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}.`);
});