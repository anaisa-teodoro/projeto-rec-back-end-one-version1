const { usuarioEstaAtivo } = require("../libs/validators")
const { validarBody, salvarLocalidade, atualizarLocalidade, listarLocalidades, listarLocalidadesId, deletarLocalidade } = require("../libs/localidades.lib");

async function plataforma(req, res) {
  const body = req.body;
  const usuario_id = req.payload.id;
  const quantidade = body.quantidade;

  try {
    //obrigamos a passar a quantidade de localidades a serem salvos mas também verificamos se tem um payload com o id do usuário que esta fazendo a requisição para depois verificar se ele esta ativo na bd.
    if (quantidade == null || usuario_id == null) {
      throw new Error(
        "Requisição incompleta, faltam dados obrigatórios :  quantidade "
      );
    }
    // validar que usuário este ativo na bd pode ter sido desativado por um admin e ter um token valido ainda
    await usuarioEstaAtivo(usuario_id, res);
    // validar que o body tenha os campos necessários para salvar um localidade
    if (!(await validarBody(body))) {
      res.status(400);
      throw new Error("Requisição com dados inválidos");
    }
    
    await salvarLocalidade(body, quantidade, usuario_id, req, res);
  } catch (error) {
    return res.json(error.message);
  }
}
async function update(req, res) {

  const body = req.body;
  const usuario_id = req.payload.id;
  const localidade_id = req.params.id;
  const quantidade = body.quantidade;

  try {
    // validar que usuário este ativo na bd pode ter sido desativado por um admin e ter um token valido ainda
    await usuarioEstaAtivo(usuario_id, res);
    //verificar que quantidade e sejam numeros, que a descricao nao seja um numero e que o body nao esteja vazio
    if ((Object.keys(body).length === 0) || (quantidade && isNaN(quantidade)) || (body.descricao && !isNaN(body.descricao))) {
      res.status(400);
      throw new Error("Requisição com dados inválidos");
    }
    // validar que o body, o req.payload e req.params tenha os campos necessários para atualizar um localidade e/o a quantidade num local e logo atualizar dependedo da requisição
    await atualizarLocalidade(usuario_id, localidade_id, quantidade, req, res);
  } catch (error) {
    return res.json(error.message);
  }
}
async function index(req, res) {
  const usuario_id = req.payload.id;

  try {
    // validar que usuário este ativo na bd pode ter sido desativado por um admin e ter um token valido ainda
    await usuarioEstaAtivo(usuario_id, res);
    // listar localidades aceita query params para filtrar por controlado ou não controlado
    await listarLocalidades(req, res);
  } catch (error) {
    return res.json(error.message);
  }

}
async function indexId(req, res) {
  const usuario_id = req.payload.id;
  const localidade_id = req.params.id;
  try {
    //verificamos se o id passado por parametro é um numero caso contrario retornamos um erro
    if (isNaN(localidade_id)) {
      res.status(400);
      throw new Error("Requisição com dados inválidos, o id do localidade deve ser um numero");
    }
    // validar que usuário este ativo na bd pode ter sido desativado por um admin e ter um token valido ainda
    await usuarioEstaAtivo(usuario_id, res);
    // listamos um localidade por id
    await listarLocalidadesId(req, res, localidade_id);
  } catch (error) {
    return res.json(error.message);
  }

}
async function deleteId(req, res) {
  const usuario_id = req.payload.id;
  const localidade_id = req.params.id;
  try {
    //validamos que o id passado por parametro seja um numero caso contrario retornamos um erro
    if (isNaN(localidade_id)) {
      res.status(400);
      throw new Error("Requisição com dados inválidos, o id do localidade deve ser um numero");
    }
    // validar que usuário este ativo na bd pode ter sido desativado por um admin e ter um token valido ainda
    await usuarioEstaAtivo(usuario_id, res);
    // deletamos um localidade por id so se ele nao estiver relacionado a nenhum local
    await deletarLocalidade(req, res);

  } catch (error) {
    return res.json(error.message);
  }


}
module.exports = {
  plataforma,
  update,
  index,
  indexId,
  deleteId
};
