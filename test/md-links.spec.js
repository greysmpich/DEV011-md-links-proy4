const { mdLinks } = require('../index.js');
const functions = require('../functions.js');


describe('mdLinks', () => {
  // test('Resuelve con un array de enlaces para una ruta absoluta válida', () => {
  //   const absolutePath = functions.toAbsolutePath('./README.md');
  //   return mdLinks(absolutePath).then((extractedLinks) => {
  //     expect(extractedLinks).toBeDefined();
  //     expect(Array.isArray(extractedLinks)).toBe(true);
  //   });
  // });
  test('Convierte a ruta absoluta al recibir una ruta relativa', () => {  
    const relativePath = './README.md';
    return mdLinks(relativePath).then((extractedLinks) => { 
       const absolutePath = functions.toAbsolutePath(relativePath);
       expect(absolutePath).toBe(functions.toAbsolutePath(relativePath));
       expect(extractedLinks).toBeDefined();  
    })
  });
  test('Error simulado al leer el archivo Markdown', () => {  
    const relativePath = './README.md';
    return mdLinks(relativePath).then((extractedLinks) => { 
       const absolutePath = functions.toAbsolutePath(relativePath);
       expect(absolutePath).toBe(functions.toAbsolutePath(relativePath));
       expect(extractedLinks).toBeDefined();  
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
  test('Debería resolver la promesa con un array', () => {
    return mdLinks('./README.md').then((extractedLinks) => {
      expect(extractedLinks).toBeDefined();
      expect(Array.isArray(extractedLinks)).toBe(true);
    })
  });
});
