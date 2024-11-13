const Usuarios = require("../models/Usuario.js")
const { estaNaBD } = require("../libs/validators.js");
const {
  validarBody,
  filtroPlataforma,
  informoEmailESenha,
  gerarToken,
} = require("../libs/usuarios.lib.js");
const {parse} = require('dotenv');

module.exports = {
  async plataforma(req, res) {
    try {
      const body = req.body;
      //validar se o body esta completo
      if (!(await validarBody(body))) {

        res.status(400);
        throw new Error("Requisição com dados inválidos!");
      }
      //validar se o cpf já está cadastrado
      if (await estaNaBD(Usuarios, "cpf", body.cpf)) {
        res.status(409);
        throw new Error("CPF já cadastrado!");
      }
      //validar se o email ja esta cadastrado
      if (await estaNaBD(Usuarios, "email", body.email)) {
        res.status(409);
        throw new Error("Email já cadastrado!");
      }
      // tentativa de criar um usuario
      const user = await Usuarios.create(await filtroPlataforma(body));
      // verificar se o usuario foi criado
      if (user) {
        return res.status(201).json({
          message: "Usuário cadastrado com sucesso!",
          identificador: user.id,
          status: user.status,
        });
      }
      // caso algum erro ocorra devolvemos o erro para o cliente
    } catch (error) {
      return res.json(error.message);
    }
  },
  async login(req, res) {
    try {
      const body = req.body;
      //validar se o body contem email e senha
      if (!(await informoEmailESenha(body))) {
        res.status(400);
        throw new Error("Requisição com dados inválidos!");
      }
      //esta no bd?
      if (!(await estaNaBD(Usuarios, "email", body.email))) {
        res.status(404);
        throw new Error("Usuário não encontrado!");
      }
      //gerar token
      await gerarToken(Usuarios, body, res);
      // caso algum erro ocorra devolvemos o erro para o cliente
    } catch (error) {
      return res.json(error.message);
    }
  },
  async update(req, res) {
    try {
      const body = req.body;
      const paramsId = req.params.id;
      //verificar se o token da requisição  traz o mesmo id do usuario que esta sendo atualizado
      if (req.payload.id !== Number(paramsId)) {
        res.status(401);
        throw new Error("Sem permissão para atualizar este usuário!");
      }
      //verificar se  tem algum dado para atualizar
      if (Object.keys(novosDados).length === 0) {
        res.status(400);
        throw new Error("Nenhum dado válido para atualizar foi recebido!");
      }
      //atualizar o usuario na base de dados
      const user = await Usuarios.update(body, {
        where: {
          id: paramsId,
        },
      });
      //verificar se o usuario foi atualizado e devolver uma mensagem de sucesso
      if (user) {
        return res.status(202).json({
          message: `Usuário ${paramsId} atualizado com sucesso!`,
          updated: body,
        });
      }
    } catch (error) {
      // caso algum erro ocorra devolvemos o erro para o cliente
      return res.json(error.message);
    }
  },
  async status(req, res) {
    const status = req.body.status;
    const paramsId = req.params.id;
    const idUsuarioReq = req.payload.id;
    try {
      //verificar se o usuario que está fazendo a requisição existe e esta ativo
      const usuarioReq = await Usuarios.findByPk(idUsuarioReq)
      if (!usuarioReq || usuarioReq.status === 'inativo') {
        res.status(401)
        throw new Error("Sem permissão para este endpoint!")
      }
      // so aceitar valores ativo ou inativo para o status e verificar se o status foi informado
      if ((status !== "ativo" && status !== "inativo") || !status) {
        res.status(400);
        //se o status não foi informado ou é inválido devolvemos uma mensagem de erro
        let msg = !status
          ? "Status não informado!"
          : "Status informado inválido!";
        throw new Error(msg);
      }
      //tem algum usuario com esse id no bd?
      if (!(await estaNaBD(Usuarios, "id", paramsId))) {
        res.status(404);
        throw new Error("Usuário não encontrado!");
      }
      //pega o usuario da bd  para atualizar o status
      const user = await Usuarios.findOne(
        {
          where: {
            id: paramsId
          }
        }
      )
      // caso o usuario que está requisitando quer mudar seu status impedimos 
      if (user.id === idUsuarioReq) {
        res.status(401)
        throw new Error("Vocâ não pode mudar seu status, contate um administrador...")
      }
      //verificar se o usuário foi atualizado e devolver uma mensagem de sucesso
      if (user) {
        await user.update({ status })
        return res.status(200).json({
          message: `Usuario com id ${user.id} atualizado com o status : ${status}`,
        });
      }
    } catch (error) {
      // caso algum erro ocorra devolvemos o erro para o cliente
      return res.json(error.message);
    }
  },
  async senha(req, res) {
    const { senha } = req.body;
    const paramsId = req.params.id;
    try {
      //verificar se a senha foi informada
      if (!senha) {
        res.status(400);
        throw new Error("Senha não informada!");
      }
      //tem algum usuario com esse id no bd?
      if (!(await estaNaBD(Usuarios, "id", paramsId))) {
        res.status(404);
        throw new Error("Usuário não encontrado!");
      }
      //verificar se o paramsId é o mesmo do token para impedir que um usuario altere a senha de outro
      if (req.payload.id !== Number(paramsId)) {
        res.status(401);
        throw new Error("Sem permissão para atualizar este usuário!");
      }
      //atualizar o status do usuário na base de dados
      const user = await Usuarios.update(
        { senha },
        {
          where: {
            id: paramsId,
          },
        }
      );
      //verificar se o usuario foi atualizado
      if (user) {
        res.sendStatus(204);
      }
    } catch (error) {
      // caso algum erro ocorra devolvemos o erro para o cliente
      return res.json(error.message);
    }
  },
  async index(req, res) {
    try {
      const paramsId = req.params.id;
      //verificar que o id seja um número
      if (isNaN(paramsId)) {
        res.status(400);
        throw new Error(`O id ${paramsId} informado não é um número!`);
      }

      //tem algum usuario com esse id no bd?
      if (!(await estaNaBD(Usuarios, "id", paramsId))) {
        res.status(404);
        throw new Error("Usuário não encontrado!");
      }
      const user = await Usuarios.findByPk(paramsId);
      if (user) {
        res.status(200).json(user);
      }
    } catch (error) {
      return res.json(error.message);
    }
  },
  async deleteUser(req, res) {
    try {
      const paramsId = req.params.id;
      const idUsuarioReq = req.payload.id;

      console.log(paramsId, idUsuarioReq);

      const numberId = parseInt(paramsId);

      if (isNaN(paramsId)) {
        return res.status(400).json({ message: `O id ${paramsId} informado não é um número` });
    }
    console.log("Tipo de paramsId:", typeof numberId);
      // Verificar se o id informado é um número
      if (isNaN(paramsId)) {
        res.status(400);
        throw new Error(`O id ${paramsId} informado não é um número`);
      }

      // Verificar se o usuário que está fazendo a requisição existe e está ativo
      const usuarioReq = await Usuarios.findByPk(idUsuarioReq);
      if (!usuarioReq || usuarioReq.status === "inativo") {
        res.status(401);
        throw new Error("Sem permissão para este endpoint");
      }

      // Verificar se existe um usuário com esse id no banco de dados
      const user = await Usuarios.findOne({ where: { id: numberId }, paranoid: false });
      if (!user) {
        res.status(404);
        throw new Error("Usuário não encontrado");
      }

      // Verificar se o usuário que está requisitando não está tentando se deletar
      if (user.id === idUsuarioReq) {
        res.status(401);
        throw new Error("Você não pode deletar seu próprio usuário, contate um administrador");
      }

      // Deletar o usuário (Soft delete)
      await user.destroy({ force: true });

      return res.status(200).json({
        message: `Usuário com id ${paramsId} foi deletado com sucesso`,
      });
    } catch (error) {
      // Caso algum erro ocorra, devolvemos o erro para o cliente
      return res.json(error.message);
    }
  },

  async getAllUsers(req, res) {
    try {
      // Busca todos os usuários
      const users = await Usuarios.findAll({
        where: { deleted_at: null }, 
      });
  
      if (users.length === 0) {
        return res.status(404).json({ message: "Nenhum usuário encontrado!" });
      }
  
      return res.status(200).json(users);
    } catch (error) {
      // Caso algum erro ocorra, devolvemos o erro para o cliente
      return res.status(500).json({ message: error.message });
    }
  }
};
