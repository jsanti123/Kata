# Reto Tecnico - Desarrollador Junior

## Tabla de Contenidos
- [Requisitos tecnicos](#requisitos-tecnicos)
- [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
- [Instalación y Uso](#instalacion-y-uso)
- [Test de la APP](#test-de-la-app)
- [Tecnologias que se usaron](#tecnologias-que-se-usaron)

## Requisitos tecnicos
- **Node v20.17.0**
- **npm v10.8.2**
- **Angular CLI 19.2.0**

## Configuración de Variables de Entorno
- Crea un archivo `.env` en la raiz del  proyecto backend
- Abre el archivo y agrega las siguientes variables
    ```bash
    DB_USER=''
   DB_PASSWORD=''
   DB_HOST=''
   DB_PORT=0
   DB_NAME=''
   DB_CLUSTER=''  
- Configurar las variables de entorno con los siguientes valores [enlace](https://docs.google.com/document/d/11M6kMVD2vPdB0yH4CdMQLfENNwXF1gljYhPYD7VH6zE/edit?tab=t.0)

## Instalacion y Uso
- git clone https://github.com/jsanti123/Kata.git en la carpeta destino
- ### Instalacion Backend
    - **npm install** (instalar dependencias)
    - **npm run build** (compilar el codigo)
    - **npm run dev** (desplegar la api)
- ### Instalacion Frontend
    - **npm install** (instalar dependencias)
    - **ng serve** (desplegar el servidor)

## Test de la APP
- para ejecutar los **test** se debe posicionar en la carpeta **Backend** y ejecutar el comando **npm test**

## Tecnologias que se usaron
- Express, Node.js, jest, Typescript
- MongoDB Atlas
- Angular

