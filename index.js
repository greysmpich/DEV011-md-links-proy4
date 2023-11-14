const mdLinks = (path) => {
  return new Promise((resolve, reject) => {
    if (path) {
      resolve('Éxito');
    }else{
      reject('La ruta no existe');
    }
  });
};

module.exports = { mdLinks };