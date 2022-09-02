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

        var date = { // Save Data
            "IP": body.ip,
            "PORT": body.port,
            "ID": body.playerId,
            "TOKEN": body.playerToken
        }

        if(settings.Loadall === true) { // ALL Message
            writeFile('./config.json', JSON.stringify(date, null, 2)); // Save Json
            console.log(`IP : "${body.ip}" \nPort : "${body.port}" \nSteamID : "${body.playerId}" \nPlayerToken : "${body.playerToken}"`);
            console.log(`ServerName : "${body.name}" \n ServerDescription: "${body.desc}"`);
            if(settings.dev === true) return console.log(`Type: ${body.type}`);
            console.log('[INFO] : Saved config.json');
        }
        else { // IP,PORT,ID,TOKEN Only(type)
            writeFile('./config.json', JSON.stringify(date, null, 2)); // JSONで保存
            console.log(`IP : "${body.ip}" \nPort : "${body.port}" \nSteamID : "${body.playerId}" \nPlayerToken : "${body.playerToken}"`);
            if(settings.dev === true) return console.log(`Type: ${body.type}`);
            console.log('[INFO] : Saved config.json');
        }
    });
} else { // if not found rustplus.config.json
    console.log('[Error] : rustplus.config.json is Not found!');
    console.log('[Error] : Run "npx @liamcottle/rustplus.js fcm-register" ');
    process.exit(0);
};
