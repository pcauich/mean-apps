MEAN_oficios
============

Sencilla aplicación para mantener control de oficios/#memos hecha en MEAN (Mongo-Express-Angular-Node)

Para poder ejecutar este proyecto teneis que (ya sea en windows o linux):
  1.- Instalar MongoDB
  2.- Instalar express
  3.- Instalar NodeJS

npm install : teneis que ejecutar este comando en la carpeta del proyecto para que se descargue las librerías de express y mongose,
es decir las dependencias del proyecto (si tenéis problemas hacerlo como “sudo” o superusuario). Salvando las distancias, esta acción
es similar ha hacer un “composer install” en symphony o descargarte los “.jar” definidos en el fichero “pom.xml” de Maven en Java.

npm install

node server.js: En la carpeta del proyecto teneis que lanzar este comando. Sino os funciona este poner “nodejs server.js”.
Este comando se para poner a correr el servidor y que el proyecto funcione.

node server.js

http://localhost:8080: Ya podemos ver nuestra aplicación web yendo al navegador y poniendo la URL de vuestra máquina local donde tengáis el proyecto.
Como ya he dicho podéis poner el puerto que queráis siempre que este este libre, pero lo tenéis que definir en el fichero “server.js”.

http://localhost:8080




Base tomada de: https://github.com/jarroba/MEAN_ejemplo


creditos a: https://github.com/jarroba/ y http://jarroba.com/