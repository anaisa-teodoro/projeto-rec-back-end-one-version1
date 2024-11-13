const Localidades = require("../models/Localidades");
const LocalidadeLocal = require("../models/LocalidadeLocal");
//const Usuario = require("../models/Usuario");
const UsuarioLocalidade = require("../models/UsuarioLocalidade");


const { estaNaBD } = require("../libs/validators");
async function validarBody(body) {
  const {
    nome_localidade,
    descricao, 
    tipo    
  } = body;
  if (
    !nome_localidade || !tipo || !descricao
  ) {
    return false;
  }
  return true;
}
async function filtroPlataforma(body) {
  // so destruturamos os campos que queremos permitir atualizar
  const {
    nome_localidade,
    tipo,
    descricao,
  } = body;
  // criamos um objeto vazio
  const novos_dados = {};
  // verificamos se o campo existe no body e se existe adicionamos ao objeto
  if (nome_localidade) {
    novos_dados.nome_localidade = nome_localidade;
  }

  if (tipo) {
    novos_dados.tipo = tipo;
  }
  if (descricao) {
    novos_dados.descricao = descricao;
  }
  return novos_dados;
}
async function salvarLocalidade(body, quantidade, usuario_id, req, res) {
  //pegamos o local do usuario que esta fazendo a requisição
  const local_usuario = await Locals.findOne({
    where: { usuario_id: usuario_id },
  });
  //verificamos se tem um local vinculado ao usuario
  if (!local_usuario) {
    res.status(424)
    throw new Error("Você não tem um local cadastrado");
  }

  var localidade = null;
  //validar se o localidade esta  na bd
  if (
    await estaNaBD(Localidades, "nome_localidade", req.body.nome_localidade)
  ) {
    //se o localidade esta na bd pegamos ele
    localidade = await Localidades.findOne({
      where: { nome_localidade: req.body.nome_localidade },
    });
    //antes atualizamos o localidade
    await localidade.update(await filtroPlataforma(body));
  } else {
    //caso contrario criamos o localidade
    const dados_localidade = await filtroPlataforma(body);
    localidade = await Localidades.create(dados_localidade);
  }

  // agora vamos criar a relação entre o localidade e o local
  const dados = {
    quantidade: quantidade,
    localidadeId: localidade.id,
    localId: local_usuario.id,
  };

  //verificar se nao existe o localidade no local para nao duplicar
  var atualizou = false;

  const localidade_local_bd = await LocalidadeLocal.findOne({
    where: { localidadeId: dados.localidadeId, localId: dados.localId },
  });

  var localidade_local_novo = null;

  if (!localidade_local_bd) {
    //se o localidade nao esta no local criamos ele
    localidade_local_novo = await LocalidadeLocal.create(dados);
  } else {
    //se o localidade ja esta no local atualizamos a quantidade
    dados.quantidade += localidade_local_bd.quantidade;
    await localidade_local_bd.update(dados);
    atualizou = true;
  }

  if (!localidade) {
    //se o localidade nao foi criado corretamente  criamos um erro para retornar
    throw new Error("Erro ao cadastrar localidade");
  } else {
    await UsuarioLocalidade.create({
      localidadeId: localidade.id,
      usuarioId: usuario_id,

    })
  }
  // se o localidade e a relaçao com o local foram criados corretamente retornamos uma mensagem de sucesso
  res.status(201);
  if (localidade && !atualizou) {
    res.json({
      message: "Localidade cadastrado com sucesso",
      localidade,
      localidade_local_novo,
    });
  } else {
    res.json({
      message: "Localidade atualizado com sucesso",

      localidade,
      localidade_local_bd,
    });
  }
}
async function filtroUpdate(body) {

  const {
    descricao, quantidade
  } = body;

  const novos_dados = {};

  if (descricao) {
    novos_dados.descricao = descricao;
  }
  if (quantidade) {
    novos_dados.quantidade = quantidade;
  }
  return novos_dados;

}
async function atualizarLocalidade(usuario_id, localidade_id, quantidade, req, res) {
  const dados_localidade = await filtroUpdate(req.body);
  //verificar que dados_localidade nao esta vazio

  if (Object.keys(dados_localidade).length === 0) {
    res.status(400);
    throw new Error("Nenhum dado valido para atualizar");
  }

  const localidade = await Localidades.findOne({
    where: { id: localidade_id },
  });

  const local_usuario = await Locals.findOne({
    where: { usuario_id: usuario_id },
  });

  const localidade_local_bd = await LocalidadeLocal.findOne({
    where: { localidadeId: localidade_id, localId: local_usuario.id },
  });

  if (localidade && localidade_local_bd) {
    localidade.update(dados_localidade);
    localidade_local_bd.update({ quantidade: quantidade });
  } else {
    res.status(404);
    throw new Error("Não existe esse localidade no seu local");
  }

  res.json({ ...localidade.dataValues, quantidade: localidade_local_bd.quantidade })

}
async function listarLocalidades(req, res) {
  var localidades = null;
  const tipo_params = req.query.tipo;
  //se nao vem o tipo de localidade na query listamos todos os localidades
  if (!tipo_params) {
    localidades = await Localidades.findAll(
      {
        include: {
          model: LocalidadeLocal,
          attributes: ["quantidade"],
          include: {
            model: Locals,
            attributes: ["nome_local", "logradouro", "numero", "bairro", "cidade", "estado", "cep"],
          },


        },
      }
    )
    return res.json(localidades)
  }
  //se vem o tipo de localidade na query listamos os localidades de acordo com o tipo
  const buscar = tipo_params.toLowerCase();
  //verificamos se o tipo de localidade é valido
  if (buscar != "controlado" && buscar != "naocontrolado") {
    throw new Error("Tipo de localidade inválido, tente controlado ou não controlado");
  }
  //se o tipo de localidade for controlado listamos os localidades controlados
  if (buscar == "controlado") {
    localidades = await Localidades.findAll({
      where: { tipo: "Controlado" },
      include: {
        model: LocalidadeLocal,
        attributes: ["quantidade"],
        include: {
          model: Locals,
          attributes: ["nome_local", "logradouro", "numero", "bairro", "cidade", "estado", "cep"],
        },

      },
    });
    return res.json(localidades);
  }
  //se o tipo de localidade for naocontrolado listamos os localidades naocontrolados
  if (buscar == "naocontrolado") {
    localidades = await Localidades.findAll({
      where: { tipo: "Não controlado" },
      include: {
        model: LocalidadeLocal,
        attributes: ["quantidade"],
        include: {
          model: Locals,
          attributes: ["nome_local", "logradouro", "numero", "bairro", "cidade", "estado", "cep"],
        },

      },
    });
  }
  //se existir localidades retornamos eles
  if (localidades) {
    return res.json(localidades);
  } else {
    //se nao existir localidades retornamos um erro
    throw new Error("Não existe localidades cadastrados");
  }
}
async function listarLocalidadesId(req, res) {
  // pegamos o id do localidade na url
  const localidade_id = req.params.id;
  //buscamos o localidade no banco de dados com o id passado na url
  const localidade = await Localidades.findOne({
    where: { id: localidade_id },
    include: {
      model: LocalidadeLocal,
      attributes: ["quantidade"],
      include: {
        model: Locals,
        attributes: ["nome_local", "logradouro", "numero", "bairro", "cidade", "estado", "cep"],

      },
    },

  });
  //se o localidade existir retornamos ele
  if (localidade) {
    return res.json(localidade);
  } else {
    //se o localidade nao existir retornamos um erro
    res.status(404);
    throw new Error("Localidade não encontrado");
  }
}
async function deletarLocalidade(req, res) {
  //pegamos o id do localidade na url
  const localidade_id = req.params.id;
  //buscamos o localidade no banco de dados com o id passado na url
  const localidade = await Localidades.findOne({
    where: { id: localidade_id },
    include: {
      model: LocalidadeLocal,
      attributes: ["quantidade"],
      include: {
        model: Locals,
        attributes: ["nome_local", "logradouro", "numero", "bairro", "cidade", "estado", "cep"],
      },
    },

  });
  //se o localidade nao existir retornamos um erro
  if (!localidade) {
    res.status(404);
    throw new Error("Localidade não encontrado");
  }
  //se o localidade nao estiver asociado a nenhum local podemos deletar ele caso contrario retornamos um erro
  if (localidade) {
    if (localidade.localidade_locals.length == 0) {
      localidade.destroy();
      return res.sendStatus(204);
    } else {
      res.status(401)
      throw new Error(`Não é possivel deletar o localidade pois ele esta associado a ${localidade.localidade_locals.length} local(s)`);
    }
  } else {
    res.status(404);
    throw new Error("Localidade não encontrado");
  }
}

module.exports = {
  validarBody,
  filtroPlataforma,
  salvarLocalidade,
  filtroUpdate,
  atualizarLocalidade,
  listarLocalidades,
  listarLocalidadesId,
  deletarLocalidade
};
