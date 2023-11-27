# Markdown Links

## Índice

* [1. Descripción](#1-descripción)
* [2. Instalación](#2-instalación)
* [3. Guía de uso](#3-guía-de-uso)
* 
***

## 1. Descripción
mdown-links es una librería desarrollada con Node.js que permite leer y analizar archivos markdown para validar el estado de los enlaces contenidos en ellos y proporcionar datos estadísticos útilies para un análisis más completo.  


## 2. Instalación
Para realizar la instalación de esta librería es necesario que tengas instalado [Node.js](https://nodejs.org/en)
En tu terminal ejecuta el siguiente comando:
![instalación](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/9e94a299-328a-45dd-9a34-70a34f24fe90)


## 3. Guía de uso

* Para leer un archivo markdown y extraer sus enlaces escribe mdown-links seguido de la ruta del archivo.
  - Por ejemplo:
    ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/f00610cd-1ccd-4128-9841-61d7e7428270)
    
Como resultado visualizarás en la terminal los links extraídos junto con el texto que los acompaña y el nombre del archivo del cual se extrajeron.
![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/fea5e894-88cd-46cc-8de9-d75a504740ca)

* Si deseas obtener el estado de cada uno de lis links extraídos escribe en la terminal mdown-links seguido de la ruta del archivo y de la opción --validate.
  ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/fe15f387-bf4e-4ecf-b187-06d4b1fa0ca8)

  Se mostrarán los estados y el código de estado de los enlaces: 'ok' si el enlace está activo o 'fail' si el link está roto.
  ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/a48d603c-bbd3-403c-a913-6bcece36c8f9)

* Para conocer el total de enlaces y de enlaces únicos del archivo analizado ejecuta el comando mdown-links seguido de la opción --stats.
  ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/a81bcd89-fb8c-43fa-a1f1-2a3ce2b89180)

* Si quieres conocer el número de enlaces rotos ejecuta el comando mdown-links seguido de --validate --status
  ![image](https://github.com/greysmpich/DEV011-md-links-proy4/assets/142179844/82f9ea43-277b-4edd-9532-4f5b7546379e)


