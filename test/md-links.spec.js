const { mdLinks } = require('../index.js');
const functions = require('../functions.js');

describe('mdLinks', () => {
  test("Retorna una promesa", () => {
    expect(mdLinks("./README.md")).toBeInstanceOf(Promise);
  });
  test('Verifica si la ruta es absoluta, si no lo es la convierte en una', () => {  
    const relativePath = './README.md';
    const absolutePath = functions.isAbsolutePath(relativePath) ? relativePath : functions.toAbsolutePath(relativePath);
    expect(functions.isAbsolutePath(relativePath)).toBe(false);
    expect(absolutePath).toBe(functions.toAbsolutePath(relativePath));
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
  test('Si puede leer el archivo debe resolver la promesa con un array, si no debe rechazar la promesa con un error', () => {
   try{
    return mdLinks('./README.md').then((extractedLinks) => {
      expect(extractedLinks).toBeDefined();
      expect(Array.isArray(extractedLinks)).toBe(true);
    })
   } catch {
    const markdownPath = './existingMarkdownFile.md';
  
    return mdLinks(markdownPath).catch((error) => {
      expect(error.message).toContain('Error al leer el archivo Markdown');
    });
   }
  });
});
