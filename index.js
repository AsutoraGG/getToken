/* Made by @AsutoraGG */
const { listen } = require('push-receiver');
const { existsSync } = require('fs');
const { writeFile } = require('fs/promises');

const config = require('./rustplus.config.json');

if(existsSync('rustplus.config.json')) { /* rustplus.config.jsonがあるか確認。なかったらelse */
    console.clear();
    console.log("[INFO] : found rustplus.config.json!");

    listen(config.fcm_credentials, async ({ notification, persistentId }) => {
        const body = JSON.parse(notification.data.body);

        const saveDate = {
            "IP": body.ip,
            "PORT": body.port,
            "ID": body.playerId,
            "TOKEN": body.playerToken,
            "Ingame": {
                "command": true,
                "prefix": ";"
            }
        }

        if(body.type) {
            if(body.type === 'entity') {
                if(body.entityName === 'Switch') {
                    console.log('\n--Smart Switch--')
                    console.log('Server : ' + body.ip + ':' + body.port + ' (' + body.name + ')');
                    console.log('Entity ID : ' + body.entityId);
                    console.log('Entity Type : ' + body.entityType + '\n');
                } else if(body.entityName === 'Smart Alarm') {
                    console.log('\n--Smart Alarm--')
                    console.log('Server : ' + body.ip + ':' + body.port + ' (' + body.name + ')');
                    console.log('Entity ID : ' + body.entityId);
                    console.log('Entity Type : ' + body.entityType);
                    console.log('Title : ' + notification.data.title);
                    console.log('Message : ' + notification.data.message + '\n');
                } else if(body.entityName === 'Storage Monitor') {
                    console.log('\n--Storage Monitor--')
                    console.log('Server : ' + body.ip + ':' + body.port + ' (' + body.name + ')');
                    console.log('Entity ID : ' + body.entityId);
                    console.log('Entity Type : ' + body.entityType + '\n');
                }
            }
        } else {
            console.log('\n--Player Token--');
            console.log('Player Token : ' + body.playerToken);
            console.log('Server : ' + body.ip + ':' + body.port + ' (' + body.name + ')\n');

            writeFile('./config.json', JSON.stringify(saveDate, null, 2)); // Save config data
        }
    });
} else {
    console.log('[Error] : rustplus.config.json is Not found!');
    console.log('[Error] : Run "npx @liamcottle/rustplus.js fcm-register" ');
    process.exit(0);
};