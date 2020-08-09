---
title: "nginx"
date: 2020-07-19
categories : [nodejs]
author: jhonny111s
---

--------------

# nginx

{% include badge.html content="Repositorio" repo="https://github.com/jhonny111s/examples/tree/master/async" %}

Nginx es un proxy reverso, un servidor básico http y un servidor proxy de email y tcp/udp. Esto significa que con nginx vamos a poder interceptar todas las peticiones que son enviadas a nuestro servidor, vamos a poder hacer un balanceo de carga y vamos a poder almacenar archivos estáticos y proporcionar una cache pra mejorar los tiempos de acceso entre otros.

## Proxy reverso

Un proxy reverso se encarga de ser el punto de entrada a nuestro servidor para interceptar las peticiones y redireccionarlas según la configuración que estemos usando, podemos usar subdominios para mantener separados diferentes aplicaciones en un mismo dominio o podemos tener varias instacias de la misma aplicación y hacer un balanceo de carga.

## Servidor para contenido estático

Un servidor para contenido estático básicamente es una pagina que funciona del lado del browser (html, css, js) esto significa que todos nuestros archivos no cambian y no tienen que ser servidos por un lenguaje backend (construir el html desde el servidor)

{% include note.html content="no se debe confundir tener una comunicación con un servidor para que la pagina se comporte de manera dinámica como una **Single Page Aplication** y que el servidor no envía cada pagina construida completamente." %}

## Usando nginx

Nginx es un paquete que se instala en nuestro servidor y nos permite con un archivo de configuración exponer y escuchar puertos para interactuar con procesos en nuestra maquina. Como ejemplo se va a crear un proyecto con **docker** donde vamos a tener dos API corriendo en los puertos *3001* y *3002* respectivamente y como punto de entrada vamos a tener a nginx en el puerto **80**, que nos va permitir hacer algunas configuraciones muy útiles.

{% include note.html content="se asume un conocimiento mínimo en docker, sin embargo el repositorio explica como ejecutar el proyecto." %}

### Aplicación inicial

Debemos primero tener una aplicación ya sea web o una API, para hacer nuestras pruebas, en este caso hemos decidido crear dos servidores http muy sencillos en *nodeJS* los cuales solo mostrará un texto al ser invocado.

~~~javascript
// index.js
const http = require('http');

const hostname = 'localhost';
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('MY TEXT');
});

server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
~~~

~~~bash
# Dockerfile

# Node image
FROM node:alpine

# create directory to work
RUN mkdir -p /home/node/app

# start in the directory
WORKDIR /home/node/app

# copy all files from host current directory
# to docker current directory
COPY . .

# install dependencies
RUN npm install

# use port
EXPOSE 3001

# command to run
CMD ["node", "index.js"]
~~~

### Creando docker-compose

Para tener todo nuestro ambiente lo que necesitamos es tener nuestro servidor web (nginx) corriendo y escuchar las API que creamos, para esto vamos a correr nuestro *docker-compose* que crea el servidor y dos aplicaciones que se van a conocer gracias a la network.

~~~bash
                | --> | API 1 |
client->|nginx| |
                | --> | API 2 |
~~~

~~~yaml
# docker-compose.yml
version: '3.7'
services:
  project1:
    build:
      context: ./project1
    container_name: project1
    ports:
      - "3001:3001"
    networks:
      - app-network
  
  project2:
    build:
        context: ./project2
    container_name: project2
    ports:
      - "3002:3002"
    networks:
      - app-network

  webserver:
    image: nginx
    container_name: webserver
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./nginx-conf:/etc/nginx/conf.d
    depends_on:
      - project1
      - project2
    networks:
      - app-network

networks:
  app-network:
~~~

### nginx conf

Tal vez el punto más importante es entender el archivo de configuración, aquí vamos a decirle a nuestro servidor que se comporte de una manera u otra:

- Primero vamos a decirle a nginx que se comporte como un balanceador de carga, esto quiere decir que podemos tener varias instacias de una misma aplicación y gracias al algoritmos round robin (por defecto pero podemos usar otros) podremos lograr que cuando este muy ocupada una instacias se redireccione a otra que tenga disponibilidad, por lo tanto nuestra aplicación no va incurrir en demoras o caídas de servicio.

    ~~~bash
    # nginx.conf
    upstream loadbalance {
            least_conn;
            server project1:3001;
            server project2:3002;
    }

    server {
            listen 80;
            server_name balance.localhost;
            location / {
                    proxy_pass http://loadbalance;
            }
    }
    ~~~

    Este archivo agrupa nuestras API en una sola entrada, por lo tanto cada vez que escribamos en nuestro navegador la dirección `balance.localhost` nos va responder con cualquiera de las respuesta de *project1* o *project2* (en el docker compose llamamos asi a las api).

    > Para que funcione esta dirección en nuestro navegador debemos agregarlo a nuestros hosts

    ~~~bash
    # /etc/hosts
    127.0.0.1    balance.localhost
    ~~~

- Podemos hacer que nuestro nginx se comporte como un servidor de archivos estáticos, esto significa que podemos almacenar archivos html, css y js. En este ejemplo por defecto nginx provee unos archivos y es por esto que nos muestra un html (index.html) al iniciar `localhost`.

    ~~~bash
    server {
            listen 80;
            server_name localhost;
            location / {
                    root   /usr/share/nginx/html;
                    index  index.html index.htm;
            }

            # redirect server error pages to the static page /50x.html
            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
                    root   /usr/share/nginx/html;
            }
    }
    ~~~

- Una de las características mas llamativas de ngnix es trabajar como proxy reverso y esto significa poder crear subdominios, asumamos que tenemos el dominio *example.com* y queremos tener la landing page en el dominio y una aplicación para los clientes en *client.example.com* y una aplicación para administradores en *admin.example.com*, bien con un proxy reverso lo podemos hacer fácilmente.

    ~~~bash
    server {
            listen 80;
            server_name app.localhost;
            location / {
                    proxy_pass http://project1:3001;
            }

            location /app2 {
                    proxy_pass http://project2:3002;
            }
    }

    server {
            listen 80;
            server_name app2.localhost;
            location / {
                    proxy_pass http://project2:3002;
            }
    }
    ~~~

En esta configuración de ejemplo se escucha la api *project1* cuando entramos con el subdominio `app.localhost` y a la api *project2* cuando entramos al subdominio `app2.localhost`. También podemos agregar rutas al path como lo hacemos con `app.localhost/app2`.
