---
title: "Github pages y jekyll"
date: 2019-09-02
categories : [nodejs, Github-pages, jekyll]
author: jhonny111s
---

----------------
## Crear blog en github con jekyll

{% include badge.html content="Repositorio" repo="https://github.com/jhonny111s/jekyll-example" %}

Jekyll es una herramienta para crear contenido estático, esto significa que no necesitamos interactuar con ninguna base de datos y que nuestros datos no cambian muy a menudo, algunos ejemplos de contenido son: un currículo, una landing page, un portafolio o nuestro propio blog. La idea de este artículo es mostrar cómo podemos utilizar github para alojar nuestra página de manera gratuita. 

{% include note.html content="Para mas información ver [jekyll](https://jekyllrb.com/docs/) y [github-pages](https://pages.github.com/)" %}


## Nuestro sitio

Si queremos alojar nuestro blog o landing page de un proyecto en github, es obligatorio crear primero el repositorio personal ya que este va ser nuestro punto de entrada para cualquier otro proyecto.

Para crear nuestra pagina con `github-pages` tenemos dos opciones; la primera es hacer un fork del repositorio [jekyll now](https://github.com/barryclark/jekyll-now) re-nombrando el repositorio a `username.github.io` en este caso tendremos un proyecto de prueba con toda la estructura necesaria y una pre-configuración de jekyll, la segunda opción es crear un repositorio vacío llamado `username.github.io` con el cual podemos empezar a trabajar y donde debemos estudiar un poco como generar un blog con [jekyll](https://jekyllrb.com/). 

{% include note.html content=" `username.github.io` donde username es el usuario con que estamos registrados en Github, si este no coincide nuestra pagina no va funcionar" %}

## Usando jekyll

Una vez tengamos nuestro repositorio clonado (elegimos la segunda opción un proyecto desde cero), vamos a crear un un proyecto de ejemplo con jekyll, lo primero que tenemos que hacer es instalar algunos paquetes necesarios, para este ejemplo usaremos Ubuntu sin embargo para otras configuraciones podemos ver [aquí](https://jekyllrb.com/docs/installation/).

{% include note.html content="Si no queremos instalar ruby y jekyll y solo queremos correr el proyecto, podemos usar docker, para ello podemos leer el [README](https://github.com/jhonny111s/jekyll-example) del repositorio" %}

~~~bash
sudo apt-get install ruby-full build-essential zlib1g-dev
sudo gem install jekyll bundler # No debería usar sudo, pero es para simplificar la explicación
~~~

Ahora que nuestro sistema operativo tiene todo lo necesario para funcionar, vamos a crear un proyecto con jekyll en la raíz, aquí se va a generar la minima estructura necesaria.

~~~bash
# --force sobre-escribe la raíz ya que usamos .
# jekyll new myBlog  #  el comportamiento normal es un nombre de proyecto
jekyll new . --force 
~~~


~~~bash
.
├── README.md
├── 404.html
├── Gemfile
├── Gemfile.lock
├── _config.yml
├── _posts
│   └── 2020-05-01-welcome-to-jekyll.markdown
├── about.markdown
└── index.markdown
~~~

Con esto ya tenemos una pagina funcional, debemos ir al archivo `_config.yml` y agregar la url base en este caso `/jekyll-example` para que funcione correctamente en github y no cargue por defecto otra url que estemos usando si ya tenemos otros github-pages, subimos nuestros cambios a la rama `master` o a la rama `gh-pages` y podremos visualizarlo en `https://username.github.io`, si no lo podemos ver entonces debemos ir a [settings](https://help.github.com/en/github/working-with-github-pages/creating-a-github-pages-site-with-jekyll#creating-a-repository-for-your-site) del repositorio y buscar la sección github-pages donde seleccionaremos la rama para que cargue todo desde ahí.

{% include note.html content="Para correr localmente nuestro proyecto debemos ejecutar los siguientes comandos `bundle update`, `bundle exec jekyll serve`" %}

Debemos instalar una dependencia que nos va permitir sincronizar jekyll con github-pages y para eso debemos modificar nuestro archivo `Gemfile`, agregando esta linea de código:

~~~ruby
# Gemfile
gem 'github-pages'
~~~

una vez hecho esto debemos actualizar nuestro bundle con:

~~~bash
bundle update
~~~

En este punto podemos ver nuestra pagina y una lista de publicaciones, por defecto jekyll provee un diseño y una estructura que podemos modificar por medio de un motor de templates llamado [liquid](https://jekyllrb.com/docs/liquid/), también tenemos una carpeta `_post` la cual va a contener nuestros artículos que deben nombrarse con el siguiente formato: `YY-MM-DD-TITLE.md` y se editaran con [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). El siguiente ejercicio es modificar y entender jekyll, pero lo dejaremos para un siguiente articulo. 


