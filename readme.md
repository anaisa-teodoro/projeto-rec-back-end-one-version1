# Viagem365 - API Rest

A API REST da Viagem365 é uma interface de programação de aplicações que adere aos princípios da arquitetura REST (Representational State Transfer), permitindo a comunicação eficiente e escalável com serviços web. Esta API fornece acesso a uma vasta gama de informações sobre viagens sustentáveis e experiências positivas para os usuários,e outros locais de interesse para os amantes de viagem.

Com a API da Viagem365, os desenvolvedores podem criar aplicações que permitem aos usuários:

- Cadastrar novos perfis de usuário;
- Gerenciar locais, incluindo listagem, edição e exclusão;
- Acessar informações detalhadas sobre esses locais;

O objetivo desse projeto tem como intuito desenvolver um MVP (Minimum Viable Product) para o Back-End da aplicação, utilizando as tecnologias Node, Express e PostgreSQL. Isso permitirá uma implementação ágil e preparando o projeto para futuras expansões e melhorias.

## Funcionalidades

- Cadastro de novos usuários
- Listagem e visualização de destinos
- Edição e seleção de destinos
- Visualização de informações detalhadas dos destinos
- Compartilhamento de dicas de viagem sustentável

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução do JavaScript no servidor
- **Express**: Framework para construção da API
- **PostgreSQL**: Banco de dados relacional para armazenamento de informações

## Estrutura do Projeto

- **controllers/**: Controladores para a lógica de cada rota
- **models/**: Modelos de dados para comunicação com o banco PostgreSQL
- **routes/**: Definição das rotas e endpoints da API
- **database/**: Configurações de conexão e migrações do banco de dados
- **app.js**: Configuração principal do servidor e inicialização

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [PostgreSQL](https://www.postgresql.org/) configurado
- [Thunder Client (VS Code)](https://www.thunderclient.com/) ou [Postman](https://www.postman.com/) para testar endpoints

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/anaisa-teodoro/projeto-rec-back-end-one-version1.git
   cd projeto-rec-back-end-one-version
   ```
2. Utilizado a versão específica do Node a ser usada no projeto. 
 ```bash 
 node -v >.nvmrc
  ```   
3. Instale as dependências:
 ```bash 
 npm install
  ```
4. Instale as developer dependências:
 ```bash 
npm install express --save
  ```

5. Rode o servidor:

:arrow_forward:A API estará disponível em http://localhost:3000. Para verificar se o server está funcionando, insira o comando:

 ```bash 
npm run dev
  ```
```git
Servidor executando em http://localhost:3000/
Executing (default): SELECT 1+1 AS result
Conexão com o banco de dados estabelecida com sucesso!
******************************************************
Seja bem-vindo(a) a platarforma do Viagem365!
Data e Horário do login inicial: 13/11/2024, 20:25:47
```

### Instal as dev dependências

npm install configure-env --save-dev

### Rodar o repositório:

### Na primeira vez é necessário instalar as dependências:

1. `npm install`
2. Se for em ambiente local: `npm install --dev`

### Configurando o Ambiente .env

- Para facilitar a configuração do ambiente, você pode usar o script `configure-env`, que lê um arquivo `.env.example`. Depois, gera um arquivo .env a partir desses valores.

- Ou criar manualmente um arquivo `.env` conforme comando abaixo.
  Você pode instalar via CLI por meio de outro gerenciador de pacotes.
  O ideal é instalá-lo como uma dependência de desenvolvimento em vez de global. Insiras as informções nesse arquivo as variaveis de ambiente de desenvolvimento como:database, host,usernamed,passwordb,etc;.

3. `cp .env_example .env`

### Criação do Banco de Dados
4. `npm run db:create`

### Para rodar o repositório em ambiente local

5. `npm run start:dev`

### Trabalhando com migrations:

### Criar uma migration

6. `sequelize migration:generate --name `
7. `npx sequelize-cli migration:generate --name `

### Rodar uma migration. Opções:

8. Opção nº 1: `sequelize db:migrate`
9. Opção nº 2: `npx sequelize db:migrate`

### Reverter a última migration:

10. `sequelize-cli db:migrate:undo`
11. `npx sequelize-cli db:migrate:undo`

### Trabalhando com Seeders

### Criar valores iniciais no banco de dados:

12. `sequelize db:seed:all`
13. `npx sequelize db:seed:all`

### Criação de seedrs

Para gerenciar todas as migrações de dados, você pode usar(seeders que deixam um padrão de preenchimento das tabelas. Eles podem ser usadas para preencher as tabelas do banco de dados com dados de amostra ou de teste:

 `npx sequelize seed:generate --name test `

 Atualizar os seeders
`npx sequelize-cli db:seed:undo:all`
 
 
### Endpoints de Usuário

#### Endpoints Públicos

| Endereço              | Verbo | Descrição             |
| --------------------- | ----- | --------------------- |
| `/api/usuario`        | POST  | Criar um novo usuário |
| `/api/usuarios/login` | POST  | Login do usuário      |


- Criar um novo usuário
```
     
    "nome_completo" : "Eterna Js",
    "sexo": "Feminino",
    "cpf" : "12245495874",
    "email" : "aprendiz@dev.com",
    "senha" : "DevFuturo@24",
    "endereco" : "Rua porta 3000",     
    "data_nascimento" : "2023-12-20",
     

```

#### Endpoints Protegidos por Validação de Token

| Endereço                   | Verbo | Descrição                               |
| -------------------------- | ----- | --------------------------------------- |
| `/api/usuarios/:id`        | PUT   | Atualizar informações do usuário por ID |
| `/api/usuarios/:id/status` | PUT   | Atualizar status do usuário por ID      |
| `/api/usuarios/:id/senha`  | PUT   | Atualizar senha do usuário por ID       |
| `/api/usuarios/:id`        | GET   | Obter informações do usuário por ID     |

### Endpoints Local

### Endpoints Protegidos por Token

| Endereço                    | Verbo  | Descrição                   |
| --------------------------- | ------ | --------------------------- |
| `/api/local`                | POST   | Adicionar local             |
| `/api/local`                | GET    | Obter todos os locais       |
| `/api/local/:local_id`      | GET    | Obter local por ID          |
| `/api/local/:local_id`      | PUT    | Atualizar local por ID      |
| `/api/local/:id/status`     | PUT    | Atualizar status do local   |
| `/api/local/:local_id`      | DELETE | Excluir local por ID        |
| `/api/local/:local_id/maps` | GET    | Obter mapas do local por ID |

## Organização do Ttabalho:


:point_right: [Link do Trello](https://trello.com/invite/b/672fae9f231944fed47b4d23/ATTIf8f505115d4477fed570aeceb186ff3200607CB7/viagem365-floripa-nature)

---

:kissing: Feito com muito carinho por Anaísa Mayara Teodoro e muito aprendizado nas aulas! 