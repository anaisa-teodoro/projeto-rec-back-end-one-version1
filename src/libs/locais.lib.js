async function validarBody(body) {
    try {
      await Locais.build(body).validate();
      return true;
    } catch (error) {
      return false;
    }
  }
  
  async function filtroPlataforma(body, id) {
    const camposPermitidos = [
      "nome_local",
      "cep",
      "endereco",
      "latitude",
      "longitude",
      "status",
    ];
  
    const novos_dados = {};
  
    camposPermitidos.forEach((campo) => {
      if (body[campo] !== undefined) {
        novos_dados[campo] = body[campo];
      }
    });
  
    if (id) {
      novos_dados.usuario_id = id;
    }
  
    return novos_dados;
  }
  
  async function filtroUpdate(body) {
    const camposPermitidos = [
      "nome_local",
      "descricao",      
      "cep",
      "logradouro",
      "numero",
      "bairro",
      "cidade",
      "estado",
    ];
  
    const novos_dados = {};
  
    camposPermitidos.forEach((campo) => {
      if (body[campo] !== undefined) {
        novos_dados[campo] = body[campo];
      }
    });
  
    if (Object.keys(novos_dados).length === 0) {
      throw new Error("Nenhum dado válido para atualizar!");
    }
  
    return novos_dados;
  }
  
  async function filtroStatus(body) {
    const novos_dados = {};
  
    if (body.status !== undefined) {
      novos_dados.status = body.status;
    }
  
    if (Object.keys(novos_dados).length === 0) {
      throw new Error("Nenhum dado válido para atualizar");
    }
  
    return novos_dados;
  }
  
  module.exports = {
    validarBody,
    filtroPlataforma,
    filtroUpdate,
    filtroStatus,
  };
  