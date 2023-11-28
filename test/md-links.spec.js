const axios = require('axios');
const { mdLinks } = require('../src/index.js');
const functions = require('../src/functions.js');

jest.mock('axios');

describe('mdLinks', () => {
  test('Debee retornar una promesa', () => {
    expect(mdLinks('./markdownTestFile.md')).toBeInstanceOf(Promise);
  });
  test('Debe retornar la ruta absoluta si es una ruta absoluta', () => {
    const absolutePath = functions.toAbsolutePath('./markdownTestFile.md');
    expect(functions.isAbsolutePath(absolutePath)).toBe(true);
    expect(absolutePath).toBe(absolutePath);
  });
  test('Debe convertir la ruta a absoluta si es una ruta relativa', () => {  
    const relativePath = './markdownTestFile.md';
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
    const existingMarkdownPath = './markdownTestFile.md';
  
    return mdLinks(existingMarkdownPath).then((extractedLinks) => {
      expect(extractedLinks).toBeDefined();
      expect(Array.isArray(extractedLinks)).toBe(true);
    })
  });
});

describe('mdLinks con validate', () => {
  test('Si validate es "false" debe resolver la promesa con un array de objetos(links)', () => {
    const markdownPath = './markdownTestFile.md';
    const validate = false;
    return mdLinks(markdownPath, validate).then((extractedLinks) => {
      expect(extractedLinks).toBeDefined();
      expect(Array.isArray(extractedLinks)).toBe(true);
    });
  });
  
  test('Si validate es "false", debe resolver la promesa con los enlaces extraídos', () => {
    const markdownPath = './markdownTestFile.md';
    const validate = false;
    const extractedLinks = [
      { href: 'https://es.react.dev/learn', text: 'React', file: 'markdownTestFile.md' },
      { href: 'https://www.paginaquenoexiste.com/', text: 'Figma', file: 'markdownTestFile.md' },
      { href: 'https://dribbble.com/errorpage', text: 'Dribble', file: 'markdownTestFile.md' },
      { href: 'https://vuejs.org/guide/quick-start.html', text: 'Vue.js', file: 'markdownTestFile.md' },
    ];

    jest.spyOn(functions, 'readMarkdownFile').mockResolvedValue('contenido del archivo');
    jest.spyOn(functions, 'findLinks').mockResolvedValue(extractedLinks);

    return mdLinks(markdownPath, validate).then((result) => {
      expect(result).toEqual(extractedLinks);
    });
  });
  test('Si validate es "true", debe resolver la promesa con un array de objetos(links) con dos nuevas propiedades: status y ok', () => {
    const markdownPath = './markdownTestFile.md';
    const validate = true;

    axios.head
      .mockResolvedValueOnce({ status: 200 })
      .mockResolvedValueOnce({ status: 'N/A' }) 
      .mockResolvedValueOnce({ status: 404 })
      .mockResolvedValueOnce({ status: 200 });

        return mdLinks(markdownPath, validate).then((result) => {
        expect(result).toEqual([
          { href: 'https://es.react.dev/learn', text: 'React', file: 'markdownTestFile.md', status: 200, ok: 'ok' },
          { href: 'https://www.paginaquenoexiste.com/', text: 'Figma', file: 'markdownTestFile.md', status: 'N/A', ok: 'fail' },
          { href: 'https://dribbble.com/errorpage', text: 'Dribble', file: 'markdownTestFile.md', status: 404, ok: 'fail' },
          { href: 'https://vuejs.org/guide/quick-start.html', text: 'Vue.js', file: 'markdownTestFile.md', status: 200, ok: 'ok' },
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

describe('mdLinks con validate y stats', () => {
    test('Si stats es "true" y validate es "true" debe resolver la promesa con un array de objetos(stats) con las propiedades "Total, Unique, Active y Broken"', () => {
      const markdownPath = './markdownTestFile.md';
      const validate = true;
      const stats = true;

      functions.validateLinks = jest.fn().mockResolvedValue([
        { href: 'https://es.react.dev/learn', text: 'React', file: 'markdownTestFile.md', status: 200, ok: 'ok' },
        { href: 'https://www.paginaquenoexiste.com/', text: 'Figma', file: 'markdownTestFile.md', status: 'N/A', ok: 'fail' },
        { href: 'https://dribbble.com/errorpage', text: 'Dribble', file: 'markdownTestFile.md', status: 404, ok: 'fail' },
        { href: 'https://vuejs.org/guide/quick-start.html', text: 'Vue.js', file: 'markdownTestFile.md', status: 200, ok: 'ok' },
      ]);

      return mdLinks(markdownPath, validate, stats).then((result) => {
        expect(result).toEqual({ Total: 4, Unique: 4, Active: 2, Broken: 2 });
      });
    });
})

describe('mdLinks con stats', () => {
  test('Si stats es "true" y validate es "false" debe resolver la promesa con un array de objetos(stats) con las propiedades "Total y Unique"', () => {
    const markdownPath = './markdownTestFile.md';
    const validate = false;
    const stats = true;

    functions.findLinks = jest.fn().mockResolvedValue([
      { href: 'https://es.react.dev/learn', text: 'React', file: 'markdownTestFile.md' },
      { href: 'https://www.paginaquenoexiste.com/', text: 'Figma', file: 'markdownTestFile.md' },
      { href: 'https://dribbble.com/errorpage', text: 'Dribble', file: 'markdownTestFile.md' },
      { href: 'https://vuejs.org/guide/quick-start.html', text: 'Vue.js', file: 'markdownTestFile.md' },
    ]);

    return mdLinks(markdownPath, validate, stats).then((result) => {
      expect(result).toEqual({ Total: 4, Unique: 4 });
    });
  });
})