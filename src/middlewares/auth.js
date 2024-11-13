const { verify } = require("jsonwebtoken");

module.exports = {
  async validarToken(req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(400).send("Inserir token para entrar na plataforma!")
      }
      const payload = verify(token, process.env.JWT_KEY);
      if (payload) {
        req.payload = payload;
      }
      next();
    } catch (error) {
      return res.status(401).send("Token inválido!");
    }
  },
};
