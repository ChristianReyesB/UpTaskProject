const passport = require('passport');
const Usuarios = require('../models/Usuarios');

//autenticar el usuario
exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

//Función para revisar si el usuario esta logueado
exports.usuarioAutenticado = (req, res, next) => {

    //Si el usuario esta autenticado, adelante
    if(req.isAuthenticated()){
        return next();
    }
    //No esta autenticado, redirigir al formulario
    return res.redirect('/iniciar-sesion');
}

//Función para cerrar sesión
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    })
}

//Genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
    //Verificar que el usuario existe
    const {email} = req.body
    const usuario = await Usuarios.findOne({where: {email}});

    //Si no existe el usuario
    if(!usuario){
        req.flash('error', 'No existe esa cuenta');
        res.render('reestablecer',{
            nombrePagina: 'Reestablecer tu Contraseña',
            mensajes: req.flash()
        })
    }
}