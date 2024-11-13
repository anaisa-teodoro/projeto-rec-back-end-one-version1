const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        version: "1.0.0",
        title: "projeto-back-end-one",
        description: "# Módulo III - Projeto de Recuperação Back-end - API Rest Viagem365",
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            name: "Usuários",
            description: "Endpoints de Usuários",
        },
        {
            name: "Locais",
            description: "Endpoints de Locais",
        },
    ],
}

const outputFile = '../swagger_output.json'
const endpointsFiles = ['../routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)