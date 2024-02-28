const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Demo Swagger Api',
            description: "API endpoints for a mini blog services documented on swagger",
            // contact: {
            //     name: "Desmond Obisi",
            //     email: "info@miniblog.com",
            //     url: "https://github.com/DesmondSanctity/node-js-swagger"
            // },
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:3055",
                description: "Local server"
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                },
            },
        },
    },
    // looks for configuration in specified directories
    apis: [
        path.resolve(__dirname, '../routes/access/*.js'),
        path.resolve(__dirname, '../routes/products/*.js'),
    ],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json', 'x-client-key', 'athorization')
        res.send(swaggerSpec)
    })
}
module.exports = { swaggerDocs, swaggerSpec }