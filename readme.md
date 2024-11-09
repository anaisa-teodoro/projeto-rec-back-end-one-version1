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
node index.js
  ```
```git
[anaisa@anaisa-notebook-aspirea31556  projeto-rec-back-end-one-version1]$ node index.js
Server do projeto Viagem365 rodando na porta 3000!
```

## Organização do Ttabalho:


:point_right: [Link do Trello](https://trello.com/invite/b/PXvepNMQ/ATTI70254cc8d317361e30b98ddc44f43c671CB78012/natureza365-floripa-natural-trails)

---

:kissing: Feito com muito carinho e muito aprendizado nas aulas! 