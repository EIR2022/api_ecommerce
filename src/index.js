const connect = require('./utils/connect');
const createServer = require('./utils/server');
const logger = require('./utils/logger');
const { swaggerDocs: V1SwaggerDocs } = require('./v1/swagger');

const app = createServer();

app.listen(app.get('port'), async () => {
  logger.info(`Servidor esta corriendo en el puerto: ${app.get('port')}`);
  V1SwaggerDocs(app, app.get('port'));
  await connect();
});
