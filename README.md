# star-wars-desafio

>star-wars-desafio

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

_______________________________________________________________________
Desaf?o SSilva

Tecnolog?as a utilizar:
- HTML / CSS
- JavaScript / ES6
- Vue.js
- Vue Router
- Vuex
- Axios
- Vuelidate

Servicio a utilizar:
https://swapi.co/api

Requerimientos:
Se busca una aplicaci?n web desarrollada con Vue.js que permita visualizar informaci?n de
personajes y pel?culas del universo Star Wars.

La aplicaci?n debe estar formada por las siguientes secciones:

A) Formulario de b?squeda

El usuario selecciona el tipo de b?squeda (personajes o pel?culas);
si el usuario selecciona personajes, puede agregar un t?rmino de b?squeda a la consulta,
este t?rmino s?lo puede aceptar valores alfanum?ricos.

B) Tabla de informaci?n personajes

* Para todos los resultados obtenidos al consultar personajes, se debe mostrar:
nombre, especie (nombre de la especie), planeta de origen, g?nero y a?o de nacimiento.
* Se debe poder filtrar esta tabla seg?n nombre y/o
  especie (1 solo input de texto, s?lo letras y case-insensitive);
  planeta de origen (dropdown m?ltiple), g?nero (dropdown) y a?o de nacimiento (rango de fechas).
* Al hacer click en una fila se debe abrir el detalle del personaje

C) Detalle de un personaje

Se muestra en un modal, toda la informaci?n disponible de un personaje espec?fico,
incluyendo sus naves, veh?culos, pel?culas, etc.
Tabla de informaci?n pel?culas
Para todos los resultados obtenidos al consultar personajes,
se debe mostrar: t?tulo, episodio, director y fecha de estreno.
Se debe poder filtrar esta tabla seg?n t?tulo (texto, solo letras y case-insensitive),
episodio (rango de valores), director (dropdown) y fecha de estreno (rango de fechas).
Al hacer click en una fila se debe navegar hacia el detalle de la pel?cula.

D) Detalle de una pel?cula

Se muestra toda la informaci?n disponible de una pel?cula, incluyendo su lista de personajes;
al hacer click en un personaje se debe abrir el modal de detalle de ese personaje.

Consideraciones:

* Todas las tablas se deben poder ordenar seg?n cualquiera de sus atributos.
* La informaci?n se debe obtener de SWAPI (The Star Wars API), usando Axios para las consultas HTTP.
* Las respuestas de SWAPI vienen paginadas, esto debe ser transparente para el usuario.
* Si una consulta tiene m?s de 10 resultados en total, el usuario debe poder ver y
  filtrarlos todos en la tabla.
* Una vez realizada una consulta, se deben almacenar los resultados usando Vuex para que,
  una consulta posterior, saque la informaci?n de all? en vez de llamar de nuevo a la API.
* Para la navegaci?n se debe utilizar Vue Router.
* Las validaciones deben utilizar Vuelidate.
* La aplicaci?n deber? ser subida a AWS o Heroku y a un repositorio Git p?blico.

Cualquier extra relacionado con el desaf?o es aceptable.
