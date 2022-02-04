const express = require('express');

//Exporta las rutas
const routes = require('./routes')

//Leer vistas o archivos
const path = require('path');

//Exportar bodyParser
const bodyParser = require('body-parser');

const expressValidator = require('express-validator');

const flash = require('connect-flash');

const session = require('express-session');
const cookieParser = require ('cookie-parser');
const passport = require('./config/passport');

//helpers con algunas funciones
const helpers = require('./helpers');

//Crear la conexión a la BD
const db = require('./config/db');

//Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

//Crear una app de express
const app = express();

//Donde cargar los archivos estaticos (css, js)
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine', 'pug');

//habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

//Agregar express validator a toda la aplicación
//app.use(expressValidator());



//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//Agregar flash messages
app.use(flash());

app.use(cookieParser());

// Sesiones navegar entre distintas paginas sin autenticar
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


//Pasar var dump a la aplicación
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
})



app.use('/', routes());

app.listen(3000);