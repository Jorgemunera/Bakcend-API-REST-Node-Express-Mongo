const {IncomingWebhook} = require('@slack/webhook');

const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

//aqui podemos unirlo a un tercero, email, telegram, etc
const loggerStream = {
    write: message =>{
        webHook.send({
            text:message
        })
        console.log('capturando el log', message)
    }
}

module.exports = loggerStream;