const { register, listen } = require('push-receiver');
const { existsSync } = require('fs');

const config = require('./rustplus.config.json');

if(existsSync('rustplus.config.json')) {
    console.clear();
    console.log("[INFO] : found rustplus.config.json!");

    listen(config.fcm_credentials, ({ notification, persistentId }) => {
        const body = JSON.parse(notification.data.body);
        console.log(`IP : "${body.ip}" \nPort : "${body.port}" \nSteamID : "${body.playerId}" \nPlayerToken : "${body.playerToken}"`);
    });
} else {
    console.log('[Error] : rustplus.config.json is Not found!');
    console.log('[Error] : Run "npx @liamcottle/rustplus.js fcm-register" ');
    process.exit(0);
};