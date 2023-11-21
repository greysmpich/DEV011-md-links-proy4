const { mdLinks } = require('../index.js');
const functions = require('../functions.js');

describe('mdLinks', () => {
  test("Retorna una promesa", () => {
    expect(mdLinks("./README.md")).toBeInstanceOf(Promise);
  });
  test('Debería retornar la ruta absoluta si es una ruta absoluta', () => {
    const absolutePath = functions.toAbsolutePath('./README.md');
    expect(functions.isAbsolutePath(absolutePath)).toBe(true);
    expect(absolutePath).toBe(absolutePath);
  });
  test('Debería convertir la ruta a absoluta si es una ruta relativa', () => {  
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
  test('Debería rechazar con "El archivo no es un archivo markdown" si la ruta existe pero no es un archivo Markdown', () => {
    return mdLinks('./thumb.png').catch((error) => {
      expect(error).toBe('El archivo no es un archivo markdown')
    })
  });
  test('Debería resolver la promesa con un array de objets(links) cuando lee el archivo', () => {
    const existingMarkdownPath = './README.md';
  
    return mdLinks(existingMarkdownPath).then((extractedLinks) => {
      expect(extractedLinks).toBeDefined();
      expect(Array.isArray(extractedLinks)).toBe(true);
    })
  });
  test('Si validate es "false", debe resolver la promesa con un array de objetos(links)', () => {
    const markdownPath = './README.md';
    return mdLinks(markdownPath, false).then((extractedLinks) => {
      expect(extractedLinks).toBeDefined();
      expect(Array.isArray(extractedLinks)).toBe(true);
    });
  });
});
