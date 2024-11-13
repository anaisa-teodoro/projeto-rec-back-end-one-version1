const locaisRoutes = require("express").Router();
const {plataforma, index, indexId,update,status,deleteId,indexMaps, getAllLocals} = require('../controllers/locais.controllers');
const { validarToken } = require("../middlewares/auth");

locaisRoutes.get("/api/local",getAllLocals);
locaisRoutes.get("/api/local/:local_id", indexId);
//endpoints protegidos por token
locaisRoutes.post("/api/local",validarToken,plataforma);
locaisRoutes.get("/api/local",validarToken,index);
locaisRoutes.put("/api/local/:local_id",validarToken,update);
locaisRoutes.put("/api/local/:id/status",validarToken,status);
locaisRoutes.delete("/api/local/:local_id",validarToken,deleteId);



module.exports = locaisRoutes;