const passport = require('passport');

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