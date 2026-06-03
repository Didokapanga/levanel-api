import fs from 'fs';
import { swaggerSpec } from '../src/config/swagger';

fs.mkdirSync('./src/docs', {
  recursive: true,
});

fs.writeFileSync(
  './src/docs/openapi.json',
  JSON.stringify(swaggerSpec, null, 2)
);

console.log(
  'OpenAPI généré avec succès.'
);