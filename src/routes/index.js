const usuariosRoutes = require('../routes/usuariosRoutes'); 
const localidadesRoutes = require('../routes/localidadesRoutes'); 
const locaisRoutes = require('../routes/locaisRoutes'); 


const{Router} = require('express');
const routes = new Router(); 

routes.use(usuariosRoutes);
routes.use(localidadesRoutes);
routes.use(locaisRoutes);


module.exports = routes;
