# imagen de la cual se va a levantar este docker
FROM node 

# directorio donde se va a trabajar 
WORKDIR /app   

#primero copiamos el package json para poder generar el npm install y con esto no tener que correr siempre el npm install
COPY package.json .

RUN npm install


# Especificamos que el "." es el directorio del proyecto /Example1/ .. pero al cambiar el workdir, 
# ahora pasamos de . source al /app 
# Si quisieramos podriamos poner COPY . . <={este ultimo .}(ya trabajando en /app por el workdir)
COPY . .

#esto sirve para documentar
#Con esto vemos el puerto 80 desde nuestra pc, sino no va a poder comunicarse con un contenedor 
#Los contenedores son "isolated"
ARG DEFAULT_PORT=80

ENV PORT $DEFAULT_PORT

EXPOSE $PORT
#para especificar el puerto,lo vamos a hacer desde el docker run con el -p <puerto de la app> :<puerto expuesto en la maquina>  ej: 3000:80 



# El cmd se ejecuta cuando se levanta el container.
# Si no tenemos este parametro. cuando se levante el container va a producirse un error
# el cmd Siempre es el ultimo comando 
CMD [ "npm", "start" ]


# Primero docker build -t node:udemy .
# SEGUNDO 
# docker run -d -p 3001:8000 --env PORT=8000 --rm --name node-udemy-app -v nodeUdemy:/app/nodeUdemy -v "C:\Cursos\nodeUdemy\Seccion7\00-starting-setup:/app:ro" -v /app/node_modules -v data:/app/data node:udemy
# docker run -d -p 3001:8000 --env PORT=8000 --rm --name node-udemy-app -v nodeUdemy:/app/nodeUdemy -v data:/app/data -v "C:\Cursos\nodeUdemy\Seccion7\00-starting-setup:/app:ro" -v /app/data -v /app/node_modules  node:udemy