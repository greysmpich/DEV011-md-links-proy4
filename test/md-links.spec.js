const { mdLinks } = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  it('debería retornar una promesa', () => {
    const result = mdLinks('path/to/file.md');
    expect(result).toBeInstanceOf(Promise);
  });
  it('debe resolver cuando el path existe', () => {
    return mdLinks('path/to/file.md').then((result) => {
      expect(result).toBe('Éxito')
    });
  })

  it('debe rechazar cuando el path no existe', () => {
    return mdLinks('path no existe').catch((error) => {
      expect(error).toBe('La ruta no existe')
    });
  })
});
