// Genera src/environments/environment.ts y environment.prod.ts a partir de variables
// de entorno (.env en local, variables de CI/plataforma en despliegues).
// Estos dos archivos de salida están en .gitignore: nunca se commitean con valores reales.
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const required = ['SUPABASE_URL', 'SUPABASE_KEY'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(
    `[generate-env] Faltan variables de entorno: ${missing.join(', ')}.\n` +
      `Copia .env.example a .env y rellena los valores (ver README.md).`
  );
  process.exit(1);
}

const outDir = path.join(__dirname, '..', 'src', 'environments');

const render = (production) => `// Archivo generado automáticamente por scripts/generate-env.js. No editar a mano.
export const environment = {
  production: ${production},
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabaseKey: '${process.env.SUPABASE_KEY}'
};
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'environment.ts'), render(false));
fs.writeFileSync(path.join(outDir, 'environment.prod.ts'), render(true));

console.log('[generate-env] environment.ts y environment.prod.ts generados desde variables de entorno.');
