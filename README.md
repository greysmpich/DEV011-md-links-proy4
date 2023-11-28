# @greysmpich/markdown-links

## Índice

* [1. Descripción](#1-descripción)
* [2. Instalación](#2-instalación)
* [3. Guía de uso](#3-guía-de-uso)
* [4. Disponible en](#4-disponible-en)
  
***

## 1. Descripción
markdown-links es una librería desarrollada con [Node.js](https://nodejs.org/en) que permite leer y analizar archivos [Markdown](https://es.wikipedia.org/wiki/Markdown) para validar el estado de los enlaces contenidos en ellos y proporcionar datos estadísticos útilies para un análisis más completo.  


## 2. Instalación
Como requisito debes tener isntalado [Node.js](https://nodejs.org/en).
Para realizar la instalación de esta librería ejecuta el siguiente comando en tu terminal:

![image](https://github.com/greysmpich/markdown-links/assets/142179844/d234e90a-eb39-453d-83b5-09fcc04032d9)

También puedes instalarlo directamente desde GitHub con el siguiente comando `npm install greysmpich/markdown-links`



## 3. Guía de uso

### **CLI**

* Para leer un archivo markdown y extraer sus enlaces escribe markdown-links seguido de la ruta del archivo.
  - Por ejemplo: `markdown-links prueba.md`
    
  Como resultado visualizarás en la terminal los links extraídos junto con el texto que los acompaña y el nombre del archivo del cual se extrajeron.

  ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/a69c959c-69af-4ab5-bc18-8d8d43a5dd92)

**NOTA:** Si se ingresa una ruta inexistente se mostrará el mensaje `'La ruta no existe'`, en cambio, si se ingresa la ruta de un archivo no markdown se mostrará el mensaje `'El archivo no es un markdown'`.


* Si deseas obtener el estado de cada uno de los links extraídos escribe en la terminal markdown-links seguido de la ruta del archivo y de la opción --validate.
  
  `markdown-links prueba.md --validate`

  Se mostrarán el código de estado de los enlaces y el estado: `'ok'` si el enlace está activo o `'fail'` si el link está roto.
  
  ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/d860e7e2-2f99-4c14-8324-6e4453aa7d17)

* Para conocer el total de enlaces y de enlaces únicos del archivo analizado ejecuta el comando markdown-links seguido de la opción --stats.
  
  ![image](https://github.com/greysmpich/markdown-links/assets/142179844/daca8b2b-0dbc-4b31-815f-5301b051f04a)

* Si quieres conocer el número de enlaces rotos ejecuta el comando markdown-links seguido de --validate --stats
  
  ![image](https://github.com/greysmpich/markdown-links/assets/142179844/892f187d-ab87-47e5-9466-21aa52ac5a5c)
  
### **Importación de módulo**

* Puedes importar el módulo markdown-links de la siguiente manera.
  
  `const { mdLinks } = require('@greysmpich/markdown-links');`

* Para extraer los enlaces del archivo markdown a analizar coloca como argumento la ruta del archivo.
  - Por ejemplo:
    
    ![image](https://github.com/greysmpich/markdown-links/assets/142179844/b5a20d38-5ca6-40fd-81cf-2ffef8f3a40c)

* Para conocer el estado de los enlaces del archivo markdown coloca como segundo argumento '--validate'.
  - Por ejemplo:
    
    ![image](https://github.com/greysmpich/markdown-links/assets/142179844/49c16354-091d-4109-8d3b-abe83b56368c)

* Para obtener datos estadísticos sobre el total de enlaces y enlaces únicos del archivo markdown coloca como segundo argumento false y como tercer argumento '--stats'.
  - Por ejemplo:

    ![image](https://github.com/greysmpich/markdown-links/assets/142179844/1f2ce6e3-608d-4c97-8cca-360827a68565)

* Para obtener datos estadísticos sobre el total de enlaces, enlaces únicos, enlaces activos y enlaces rotos del archivo markdown coloca como segundo argumento --validate y como tercer argumento '--stats'.
  - Por ejemplo:

    ![image](https://github.com/greysmpich/markdown-links/assets/142179844/846c561e-8ec3-4bf4-b7da-6c88c6a7d531)

* Comprueba el comportamiento de la función escribiendo en la terminal el comando node seguido del nombre del archivo donde importaste el módulo.
 - Por ejemplo: `node prueba.js`

## 4. Disponible en
Esta librería está disponible en [NPM](https://www.npmjs.com/package/@greysmpich/markdown-links)


    

