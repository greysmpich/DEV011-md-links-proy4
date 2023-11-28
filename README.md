# @greysmpich/mdwn-links

## Índice

* [1. Descripción](#1-descripción)
* [2. Instalación](#2-instalación)
* [3. Guía de uso](#3-guía-de-uso)
* [4. Disponible en](#4-disponible-en)
  
***

## 1. Descripción
mdwn-links es una librería desarrollada con Node.js que permite leer y analizar archivos [Markdown](https://es.wikipedia.org/wiki/Markdown) para validar el estado de los enlaces contenidos en ellos y proporcionar datos estadísticos útilies para un análisis más completo.  


## 2. Instalación
Para realizar la instalación de esta librería es necesario que tengas instalado [Node.js](https://nodejs.org/en)
En tu terminal ejecuta el siguiente comando:

![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/dc09864a-f600-4d6a-ae37-c46b43be23bb)


## 3. Guía de uso

### **CLI**

* Para leer un archivo markdown y extraer sus enlaces escribe mdwn-links seguido de la ruta del archivo.
  - Por ejemplo:
    ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/77b71dbb-df45-419a-a480-66dc0ce71efe)
    
  Como resultado visualizarás en la terminal los links extraídos junto con el texto que los acompaña y el nombre del archivo del cual se extrajeron.

  ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/a69c959c-69af-4ab5-bc18-8d8d43a5dd92)

**NOTA:** Si se ingresa una ruta inexistente en nuestro equipo se mostrará el mensaje 'La ruta no existe', en cambio, si se ingresa la ruta de un archivo no markdown se mostrará el mensaje 'El archivo no es un markdown'.

![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/b1da25c3-79b9-426c-86c0-ed3b2d97e09b)

![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/fe0a95c0-5ed2-461e-ab8c-e1975dd4aef2)


* Si deseas obtener el estado de cada uno de los links extraídos escribe en la terminal mdwn-links seguido de la ruta del archivo y de la opción --validate.
  ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/315b4ca7-a0eb-4e0b-993c-9f4e92b93ddb)

  Se mostrarán los estados y el código de estado de los enlaces: 'ok' si el enlace está activo o 'fail' si el link está roto.
  
  ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/d860e7e2-2f99-4c14-8324-6e4453aa7d17)

* Para conocer el total de enlaces y de enlaces únicos del archivo analizado ejecuta el comando mdwn-links seguido de la opción --stats.
  
  ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/ace0a0eb-6481-4cf5-be41-19768eab26f3)


* Si quieres conocer el número de enlaces rotos ejecuta el comando mdown-links seguido de --validate --status
  
  ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/5b0e06c3-96f1-406e-b6dd-c430bd7888b0)
  
### **Importación de módulo**

* Puedes importar el módulo mdwn-links de la siguiente manera.
  
![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/d3468e80-8a08-4768-9c6f-8e1883e11669)

* Para extraer los enlaces del archivo markdown a analizar coloca como argumento la ruta del archivo.
  - Por ejemplo:
    
    ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/63749fd8-c30a-4a62-9b64-ef599601cd8c)

* Para conocer el estado de los enlaces del archivo markdown coloca como segundo argumento '--validate'.
  - Por ejemplo:
    
    ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/47a6cf58-aeca-45ea-a68a-04c5f972bc9a)

* Para obtener datos estadísticos sobre el total de enlaces y enlaces únicos del archivo markdown coloca como segundo argumento false y como tercer argumento '--stats'.
  - Por ejemplo:

    ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/ed5bbc2d-41fe-4259-a470-cf1c65f3d0e9)

* Para obtener datos estadísticos sobre el total de enlaces, enlaces únicos, enlaces activos y enlaces rotos del archivo markdown coloca como segundo argumento --validate y como tercer argumento '--stats'.
  - Por ejemplo:

    ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/e1982b7a-2e47-4309-a8e2-17baed998f29)

* Comprueba el comportamiento de la función escribiendo en la terminal el comando node seguido del nombre del archivo donde importaste el módulo.
 - Por ejemplo:

    ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/c3a203bb-d7b0-4eb2-a544-14415fdb44d8)

## 4. Disponible en
Esta librería está disponible en [NPM](https://www.npmjs.com/package/@greysmpich/mdwn-links)


    

