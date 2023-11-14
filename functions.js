const path = require('path');

exports.absolutePath = (rutaRelativa) => {
  return path.resolve(rutaRelativa)
}

