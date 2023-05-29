## Instalacion
- limpiar proyecto `rm -rf node_modules .git`
- subir un nivel y comprimir el directorio `.. && zip -r bot.zip <nombre-carpeta>`
- subir el comprimido al servidor `scp bot.zip root@47.254.123.37:/root/proyectos` [link](https://desarrolloweb.com/articulos/transferir-archivos-scp-ssh.html)
- ingresar al servidor `ssh root@47.254.123.37`
- instalar ngrok via apt [link](https://ngrok.com/download)
- connect ngrok account [link](https://dashboard.ngrok.com/get-started/setup)
- decompress zip `unzip bot.zip`
- construir la imagen con tag `docker build -t whatsapp-bot .`
- verificar el archivo .env
- correr el contenedor `docker run -d -p 3000:3000 --name wa-bot --env-file ./.env whatsapp-bot`
- correr ngrok en el fondo `nohup ngrok http 3000 --log=stdout > /dev/null &` *nohup* para mantener el comando en caso la conexion ssh muera [link](https://stackoverflow.com/questions/27162552/how-to-run-ngrok-in-background)
- obtener link ngrok `curl localhost:4040/api/tunnels`
- agregar hook a app en facebook for developers, ir a configuracion 
- agregar webhook `<ngrok-link>/webhook` y el token de verficacion que esta en el archivo .env
- en "campos de hook" habilitar "messages" con la version 16

### CHATBOT Whatsapp (Meta Provider)

<p align="center">
  <img width="300" src="https://i.imgur.com/Oauef6t.png">
</p>


**Con esta librería, puedes construir flujos automatizados de conversación de manera agnóstica al proveedor de WhatsApp,** configurar respuestas automatizadas para preguntas frecuentes, recibir y responder mensajes de manera automatizada, y hacer un seguimiento de las interacciones con los clientes.  Además, puedes configurar fácilmente disparadores que te ayudaran a expandir las funcionalidades sin límites. **[Ver más informacion](https://bot-whatsapp.netlify.app/)**

```js
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])

    const adapterProvider = createProvider(MetaProvider, {
        accountSid: process.env.ACC_SID,
        authToken: process.env.ACC_TOKEN,
        vendorNumber: process.env.ACC_VENDOR,
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}
```

```
npm install
npm start
```

---
## Recursos
- [📄 Documentación](https://bot-whatsapp.netlify.app/)
- [🚀 Roadmap](https://github.com/orgs/codigoencasa/projects/1)
- [💻 Discord](https://link.codigoencasa.com/DISCORD)
- [👌 Twitter](https://twitter.com/leifermendez)
- [🎥 Youtube](https://www.youtube.com/watch?v=5lEMCeWEJ8o&list=PL_WGMLcL4jzWPhdhcUyhbFU6bC0oJd2BR)
