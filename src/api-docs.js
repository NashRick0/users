import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {  // Anteriormente estaba como "swaggerDefinition"
        openapi: '3.0.0',
        info: {
            title: 'Docu API',
            version: '1.0.0',
            description: 'API Documentation for use'
        },
        servers: [
            {
                url: 'http://localhost:3001', // Corregido
                description: 'Local server'
            }
        ]
    },
    apis: ['src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
