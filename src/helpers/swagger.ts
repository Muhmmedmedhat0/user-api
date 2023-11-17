import { Express, Response, Request } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    userApi: '1.0.0',
    info: {
      title: 'User API Docs',
      version: '1.0.0',
      description: 'public user API',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }], // Adding security at the global level
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts', './src/docs/*.yml'],
  basePath: '/api'
};
const swaggerSpec = swaggerJSDoc(options);


function swaggerDocs(app: Express, port: number) {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format
  app.get('/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.info(`Docs available at http://localhost:${port}/docs`);
}
export default swaggerDocs;
