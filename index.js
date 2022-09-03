/* Made by @AsutoraGG */
const { listen } = require('push-receiver');
const { existsSync } = require('fs');
const { writeFile } = require('fs/promises')

const settings = require('./settings.json');
const config = require('./rustplus.config.json');

if(existsSync('rustplus.config.json')) { /* rustplus.config.jsonがあるか確認。なかったらelse */
    console.clear();
    console.log("[INFO] : found rustplus.config.json!");

    listen(config.fcm_credentials, ({ notification, persistentId }) => {
        const body = JSON.parse(notification.data.body);

        var date = {
            "IP": body.ip,
            "PORT": body.port,
            "ID": body.playerId,
            "TOKEN": body.playerToken
        }

        var chatappDate = {
            "IP": body.ip,
            "PORT": body.port,
            "ID": body.playerId,
            "TOKEN": body.playerToken,
            "Ingame": {
                "command": true,
                "prefix": ";"
            }
        }

        if(settings.Loadall === true) {
            if (settings.chatAppConfig === true) {
                writeFile('./config.json', JSON.stringify(chatappDate, null, 2));
            } else return writeFile('./config.json', JSON.stringify(date, null, 2));
            console.log(`IP : "${body.ip}" \nPort : "${body.port}" \nSteamID : "${body.playerId}" \nPlayerToken : "${body.playerToken}"`);
            console.log(`ServerName : "${body.name}" \n ServerDescription: "${body.desc}"`);
            if(settings.dev === true) return console.log(`Type: ${body.type}`);
            console.log('[INFO] : Saved config.json');
        }
        else {
            if (settings.chatAppConfig === true) {
                writeFile('./config.json', JSON.stringify(chatappDate, null, 2));
            } else return writeFile('./config.json', JSON.stringify(date, null, 2));
            console.log(`IP : "${body.ip}" \nPort : "${body.port}" \nSteamID : "${body.playerId}" \nPlayerToken : "${body.playerToken}"`);
            if(settings.dev === true) return console.log(`Type: ${body.type}`);
            console.log('[INFO] : Saved config.json');
        }
    });
} else {
    console.log('[Error] : rustplus.config.json is Not found!');
    console.log('[Error] : Run "npx @liamcottle/rustplus.js fcm-register" ');
    process.exit(0);
};