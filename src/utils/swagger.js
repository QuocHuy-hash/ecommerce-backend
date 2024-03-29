const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce API',
            description: "API endpoints for Shop Ecommerce",
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:3055",
                description: "Local Development Server"
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            parameters: {
                ClientIdHeader: {
                    in: 'header',
                    name: 'x-client-id',
                    schema: {
                        type: 'string'
                    },
                    required: true,
                    description: 'Unique identifier for the client/user'
                },
                AuthorizationHeader: {
                    in: 'header',
                    name: 'authorization',
                    schema: {
                        type: 'string'
                    },
                    required: true,
                    description: 'JWT token for authentication'
                }
            },
            responses: {
                Success: {
                    description: 'Successful operation',
                    content: {
                        message: {
                            type: 'string',
                            example: 'Success'
                        }
                    }
                },
                NotFound: {
                    description: 'Resource not found',
                    message: {
                        type: 'string',
                        example: 'Resource not found'
                    }
                },
                Unauthorized: {
                    description: 'Unauthorized access',
                    message: {
                        type: 'string',
                        example: 'Unauthorized'
                    }

                },
                BadRequest: {
                    description: 'Invalid request parameters',
                    message: {
                        type: 'string',
                        example: 'Invalid request parameters'
                    }
                }
            },

        },
    },
    apis: [
        path.resolve(__dirname, '../routes/access/*.js'),
        path.resolve(__dirname, '../routes/products/*.js'),
        path.resolve(__dirname, '../routes/carts/*.js'),
    ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    // Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

module.exports = { swaggerDocs, swaggerSpec };
