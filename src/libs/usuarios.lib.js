const { sign } = require("jsonwebtoken");

async function validarBody(body) {
  const {
    nome_completo,  
    data_nascimento,
    cpf,
    email,
    senha,
  } = body;
  if (
    !email ||
    !nome_completo ||
    !data_nascimento ||
    !cpf ||
    !senha 
   
  ) {
    return false;
  }
  return true;
}

async function filtroPlataforma(body) {
  const {
    nome_completo,  
    sexo,
    data_nascimento,
    cpf,  
    email,
    senha,
    endereco,
  } = body;
  const novos_dados = {};
  if (sexo) {
    novos_dados.sexo = sexo;
  }
  if (email) {
    novos_dados.email = email;
  }
  if (nome_completo) {
    novos_dados.nome_completo = nome_completo;
  }
  if (data_nascimento) {
    novos_dados.data_nascimento = data_nascimento;
  }
  if (cpf) {
    novos_dados.cpf = cpf;
  }
  if (endereco) {
    novos_dados.endereco = endereco;
  }
  if (senha) {
    novos_dados.senha = senha;
  }

  return novos_dados;
}
async function informoEmailESenha(body) {
  const { email, senha } = body;
  if (!email || !senha) {
    return false;
  }
  return true;
}
async function gerarToken(Usuarios, body, res) {
  //pegamos o usuario da base de dados
  const user = await Usuarios.findOne({
    where: {
      email: body.email,
    },
  });

  //validar se o usuario esta ativo na base de dados
  if (user.status === "inativo") {
    res.status(401);
    throw new Error("Seu usuário está inativo");
  }
  //validar senha
  if (body.senha === user.senha) {
    //gerar payload
    const payload = { status: user.status, id: user.id };
    //gerar token
    const token = sign(payload, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    //devolver o token para o cliente
    return res.status(200).json({
      token,
    });
  } else {
    res.status(401);
    throw new Error("Email ou senha estão inválidos!");
  }
}
module.exports = {
  validarBody,
  filtroPlataforma,
  informoEmailESenha,
  gerarToken,
};
