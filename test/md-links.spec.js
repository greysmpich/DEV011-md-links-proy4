const { mdLinks } = require('../index.js');


describe('mdLinks', () => {
  test('Debería resolver la promesa con "Éxito"', () => {
    return mdLinks('./README.md').then((result) => {
      expect(result).toBe('Éxito');
    })
  });
  test('Debería rechazar con "La ruta no existe" si la ruta no existe', () => {
    return mdLinks('path/that/does/not/exist.md').catch((error) => {
      expect(error).toBe('La ruta no existe');
    })
  });

  test('Debería rechazar con "El archivo no es un archivo Markdown" si la ruta existe pero no es un archivo Markdown', () => {
    return mdLinks('./thumb.png').catch((error) => {
      expect(error).toBe('El archivo no es un archivo Markdown')
    })
  });
});
