/* --- Made by @AsutoraGG --- */
const { register, listen } = require('push-receiver');
const { existsSync } = require('fs');

const config = require('./rustplus.config.json');

if(existsSync('rustplus.config.json')) { /* rustplus.config.jsonがあるか確認 */
    console.clear(); //コンソールをクリア
    console.log("[INFO] : found rustplus.config.json!");

    listen(config.fcm_credentials, ({ notification, persistentId }) => { /* Rust+とのペアリングがあった時にお知らせ */
        const body = JSON.parse(notification.data.body); /* お知らせの内容を取得 */
        console.log(`IP : "${body.ip}" \nPort : "${body.port}" \nSteamID : "${body.playerId}" \nPlayerToken : "${body.playerToken}"`); /* IP Port ID Tokenのみ表示 */
    });
} else { /* もし .jsonがなかった場合プロセスを終了 */
    console.log('[Error] : rustplus.config.json is Not found!');
    console.log('[Error] : Run the "npx @liamcottle/rustplus.js fcm-register" ');
    process.exit(0);
};
