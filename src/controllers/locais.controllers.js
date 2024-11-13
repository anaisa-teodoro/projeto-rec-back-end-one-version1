const Locais = require("../models/Locais");
const {
  validarBody,
  filtroUpdate,
  filtroStatus,
  filtroPlataforma,
} = require("../libs/locais.lib");
const { estaNaBD, usuarioEstaAtivo } = require("../libs/validators");


module.exports = {
  async getAllLocals(req, res) {
    try {
      // Busca todos os locais
      const locals = await Locais.findAll({
        where: { deleted_at: null }, 
      });
  
      if (locals.length === 0) {
        return res.status(404).json({ message: "Nenhum local encontrado." });
      }
  
      return res.status(200).json(locals);
    } catch (error) {
      // Caso algum erro ocorra, devolvemos o erro para o cliente
      return res.status(500).json({ message: error.message });
    }
  },
  async plataforma(req, res) {
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
      const body = req.body;
      //verificar que o usuario não tenha um local ya cadastrado
      if (await estaNaBD(Locais, "usuario_id", usuario_id)) {
        res.status(409);
        throw new Error("Usuário já possui um local cadastrado");
      }

      //nome está na db ?
      if (await estaNaBD(Locais, "nome_local", body.nome_local)) {
        res.status(409);
        throw new Error("Nome já cadastrado");
      }

      console.log(body);

      //criar novo local na db
      const local = await Locais.create({
        nome_local: body.nome_local,
        cep: body.cep,
        latitude: body.latitude,
        localidade: body.localidade,
        endereco: body.endereco,
        longitude: body.longitude,
        descricao: body.descricao,
        usuario_id: usuario_id,
        status: "ativo",    
      });
      res.json(local);
    } catch (error) {
      // Se algum erro ocorrer, enviar o erro como resposta
      return res.json(error.message);
    }
  },
  async update(req, res) {
    const id = req.params.local_id;
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuário que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
      //verificar se o id passado por parâmetro é número
      if (isNaN(id)) {
        res.status(400);
        throw new Error(
          "Id passado por parâmetro obrigatoriamente deve ser numérico"
        );
      }
      // Verificar se o local existe na base de dados
      const local = await Locais.findOne({ where: { id: id }, paranoid: false });

      if (!local) {
        res.status(404);
        throw new Error("Local não encontrado");
      }
      //verificar se o local esta ativo
      if (local.status !== "ativo") {
        res.status(403);
        throw new Error("Local esta inativo");
      }
      
      //verificar se o usuario que esta requisitando  esta com status ativo
      if (req.payload.status !== "ativo") {
        res.status(403);
        throw new Error("Usuário não autorizado");
      }
      //verificar as unique da tabela local antes de tentar atualizar 
      if (req.body.nome_local && await estaNaBD(Locais, "nome_local", req.body.nome_local)) {
        res.status(409);
        throw new Error("nome_local ja cadastrado")
      }
      // Atualizar o local caso exista novos dados
      await local.update(req.body,  {
        where: {
          id: id,
        }});
      res.sendStatus(204);
    } catch (error) {
      // Se algum erro ocorrer, enviar o erro como resposta
      return res.json(error.message);
    }
  },
  async status(req, res) {
    const usuario_id = req.payload.id;
    const id = req.params.id;

    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);

      if (isNaN(id)) {
        //verificar se o id passado por parâmetro  e número
        res.status(400);
        throw new Error(
          "Id passado por parâmetro obrigatoriamente deve ser numérico"
        );
      }
      // Verificar se o local existe na base de dados
      const local = await Locais.findByPk(id);
      if (!local) {
        res.status(404);
        throw new Error("Local não encontrado");
      }
      // filtrar dados do body
      const novo_status = await filtroStatus(req, res);
      // Atualizar o local caso exista novos dados
      novo_status && (await local.update(novo_status));
      res.sendStatus(204);
    } catch (error) {
      return res.json(error.message);
    }
  },
  async index(req, res) {
    const status = req.query.status;
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
      //verificar se o status passado por parâmetro  e válido
      if (status && !["ativo", "inativo"].includes(status.toLowerCase())) {
        res.status(400);
        throw new Error("Status na query params inválido!");

      }

      // garantir que o status seja passado em minúsculo
      const status_pesquisado = status ? { status: status.toLowerCase() } : {};
      // Listar todos os locals ativos ou inativos segundo o status seja passado por query params
      const Locais = await Locais.findAll({
        where: status_pesquisado,
        include: {
          association: "usuario",
          attributes: ["nome", "status"],
        },
      });
      //  verifica se o status foi passado por query params, caso sim,
      //  retorna um objeto com o status passado por parâmetro e setea o nome 
      //  do objeto com o status [exemplo : locals_ativos ] caso contrário, 
      //  retorna um objeto com o nome Locais e o array de todos os Locais
      status
        ? res.json({
          ["locais" + String(status).toLocaleLowerCase()]: Locais,
        })
        : res.json({ Locais });
    } catch (error) {
      return res.json(error.message);
    }
  },
  async indexId(req, res) {
    const id = req.params.local_id;
    
    try {

      
      //verificar se o id passado por parâmetro  e numérico
      if (isNaN(id)) {
        res.status(400);
        throw new Error(
          "Id passado por parâmetro obrigatoriamente deve ser numérico"
        );
      }
      // Verificar se o local existe na base de dados
      const local = await Locais.findOne({ where: { id: id }, paranoid: false });

      if (!local) {
        res.status(404);
        throw new Error("Local não encontrado");
      }
      res.json(local);
    } catch (error) {
      return res.json(error.message);
    }
  },
  async deleteId(req, res) {
    const id = req.params.local_id;
    const usuario_id = req.payload.id;
    try {
      //verificar se o usuario que esta requisitando  esta com status ativo
      await usuarioEstaAtivo(usuario_id, res);
      //verificar se o id passado por parâmetro  e numérico
      
      // Verificar se o local existe na base de dados
      const local = await Locais.findOne({ where: { id: id }, paranoid: false });

      if (!local) {
        res.status(404);
        throw new Error("Local não encontrado");
      }
      //verificar se o local esta ativo
      if (local.status !== "inativo") {
        res.status(403);
        throw new Error("Local esta ativo, não pode ser deletado");
      }
      //verificar se o local esta vinculado a algum localidade
      if (local.localidades.length > 0) {
        res.status(403);
        throw new Error(
          "Local esta vinculado a algum localidade, não pode ser deletado"
        );
      }
      //deletar local
      await local.destroy({ force: true });
      res.sendStatus(204);
    } catch (error) {
      return res.json(error.message);
    }
  },
  async indexMaps (req, res) {
    const id = req.params.local_id;
    const local = await Locais.findByPk(id, {
      include: {
        association: "localidades",
      },
    });
    if (!local) {
      res.status(404);
      throw new Error("Local não encontrado");
    };

    const {latitude, longitude} = local;
    const localName = await getLocalName(latitude, longitude);
    console.log(localName);

    return res.send(localName);
  }
};
