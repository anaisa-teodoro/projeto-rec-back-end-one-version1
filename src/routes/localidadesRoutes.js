const localidadesRoutes = require("express").Router();
const { validarToken } = require("../middlewares/auth");
const { plataforma, update, index , indexId, deleteId} = require("../controllers/localidades.controllers");

//endpoints protegidos com token

localidadesRoutes.post("/api/localidades", validarToken, plataforma);
localidadesRoutes.put("/api/localidades/:id", validarToken, update)
localidadesRoutes.get("/api/localidades/", validarToken, index);
localidadesRoutes.get("/api/localidades/:id", validarToken, indexId);
localidadesRoutes.delete("/api/localidades/:id", validarToken, deleteId);



module.exports = localidadesRoutes;