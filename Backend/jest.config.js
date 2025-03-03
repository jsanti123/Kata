module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['js'], // Asegúrate de que Jest maneje archivos .ts y .js
    testMatch: ['<rootDir>/dist/test/**/*.spec.js'], // Configura la ruta de tus pruebas
    transformIgnorePatterns: [
      'node_modules/', // No ignorar node_modules, sólo transforma los archivos .ts
    ],
  };
  