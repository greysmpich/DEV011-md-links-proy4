const axios = require('axios');
const { mdLinks } = require('../src/index.js');
const functions = require('../src/functions.js');

jest.mock('axios');

describe('mdLinks', () => {
  test('Debee retornar una promesa', () => {
    expect(mdLinks("./README.md")).toBeInstanceOf(Promise);
  });
  test('Debe retornar la ruta absoluta si es una ruta absoluta', () => {
    const absolutePath = functions.toAbsolutePath('./README.md');
    expect(functions.isAbsolutePath(absolutePath)).toBe(true);
    expect(absolutePath).toBe(absolutePath);
  });
  test('Debe convertir la ruta a absoluta si es una ruta relativa', () => {  
    const relativePath = './README.md';
    const absolutePath = functions.isAbsolutePath(relativePath) ? relativePath : functions.toAbsolutePath(relativePath);
    expect(functions.isAbsolutePath(relativePath)).toBe(false);
    expect(absolutePath).toBe(functions.toAbsolutePath(relativePath));
  });
  test('Debe rechazar con "La ruta no existe" si la ruta no existe', () => {
    return mdLinks('path/that/does/not/exist.md').catch((error) => {
      expect(error).toBe('La ruta no existe');
    })
  });
  test('Debe rechazar con "El archivo no es un archivo markdown" si la ruta existe pero no es un archivo Markdown', () => {
    return mdLinks('./thumb.png').catch((error) => {
      expect(error).toBe('El archivo no es un archivo markdown')
    })
  });
  test('Debe resolver la promesa con un array de objets(links) cuando lee el archivo', () => {
    const existingMarkdownPath = './README.md';
  
    return mdLinks(existingMarkdownPath).then((extractedLinks) => {
      expect(extractedLinks).toBeDefined();
      expect(Array.isArray(extractedLinks)).toBe(true);
    })
  });
});

describe('mdLinks con validate', () => {
  test('Si validate es "false" debe resolver la promesa con un array de objetos(links)', () => {
    const markdownPath = './README.md';
    return mdLinks(markdownPath, false).then((extractedLinks) => {
      expect(extractedLinks).toBeDefined();
      expect(Array.isArray(extractedLinks)).toBe(true);
    });
  });
  
  test('Si validate es "false", debe resolver la promesa con los enlaces extraídos', () => {
    const markdownPath = './prueba.md';
    const extractedLinks = [
      { href: 'https://es.react.dev/learn', text: 'React', file: 'prueba.md' },
      { href: 'https://www.paginaquenoexiste.com/', text: 'Figma', file: 'prueba.md' },
      { href: 'https://dribbble.com/errorpage', text: 'Dribble', file: 'prueba.md' },
      { href: 'https://vuejs.org/guide/quick-start.html', text: 'Vue.js', file: 'prueba.md' },
    ];

    jest.spyOn(functions, 'readMarkdownFile').mockResolvedValue('contenido del archivo');
    jest.spyOn(functions, 'findLinks').mockResolvedValue(extractedLinks);

    return mdLinks(markdownPath, false).then((result) => {
      expect(result).toEqual(extractedLinks);
    });
  });
  test('Si validate es "true", debe resolver la promesa con un array de objetos(links) con dos nuevas propiedades: status y ok', () => {
    const markdownPath = './prueba.md';

    axios.head
      .mockResolvedValueOnce({ status: 200 })
      .mockResolvedValueOnce({ status: 'N/A' }) 
      .mockResolvedValueOnce({ status: 404 })
      .mockResolvedValueOnce({ status: 200 });

        return mdLinks(markdownPath, true).then((result) => {
        expect(result).toEqual([
          { href: 'https://es.react.dev/learn', text: 'React', file: 'prueba.md', status: 200, ok: 'ok' },
          { href: 'https://www.paginaquenoexiste.com/', text: 'Figma', file: 'prueba.md', status: 'N/A', ok: 'fail' },
          { href: 'https://dribbble.com/errorpage', text: 'Dribble', file: 'prueba.md', status: 404, ok: 'fail' },
          { href: 'https://vuejs.org/guide/quick-start.html', text: 'Vue.js', file: 'prueba.md', status: 200, ok: 'ok' },
        ]);
          expect(axios.head.mock.calls).toEqual([
            ['https://es.react.dev/learn'],
            ['https://www.paginaquenoexiste.com/'],
            ['https://dribbble.com/errorpage'],
            ['https://vuejs.org/guide/quick-start.html'],
          ]);
        })
  });
});
describe('validateLinks debe manejar los errores correctamente con respuesta indefinida', () => {
  test('Debe manejar errores correctamente', () => {
    const links = [
      { href: 'https://www.paginaquenoexiste.com/' },
      { href: 'https://dribbble.com/errorpage' },
    ];

    axios.head
    .mockResolvedValueOnce({})
    .mockRejectedValueOnce({ response: { status: 404 } });

    return functions.validateLinks(links).catch((error) => {
      //expect(error).toBeInstanceOf(Error);
      expect(error).toEqual([
        { href: 'https://www.paginaquenoexiste.com/', status: 'N/A', ok: 'fail' },
        { href: 'https://dribbble.com/errorpage', status: 404, ok: 'fail' },
      ]);
      expect(axios.head.mock.calls).toEqual([
        ['https://www.paginaquenoexiste.com/'],
        ['https://dribbble.com/errorpage'],
      ]);
    })
  })
})
