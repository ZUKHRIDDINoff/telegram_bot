import express from 'express'
import { Bot } from "grammy"
import './config.js'
import database from './utils/db.js'

const token = '5197589042:AAF8eC7jpT15ayQb7-WLwBpjfmI1LJ9JKeM'
const bot = new Bot(token);
const PORT = process.env.PORT || 4000
const app = express()



bot.command("start", async (ctx) => {
    ctx.reply(`Welcome to testing bot!\n
    You can control me by sending these commands:\n
    \/photo  -  get random photo\n
    \/users_data  -  get all users data from postgres database using sequelize\n
    \/send write something  -  send your message to all users\n
    `)
    const db = await database()

    const user = await db.models.User.findAll({
        where: {
            user_id: ctx.message.from.id
        }
    })
    if (user.length == 0) {
        await db.models.User.create({
            user_id: ctx.message.from.id,
            username: ctx.message.from.username,
            first_name: ctx.message.from.first_name,
            last_name: ctx.message.from.last_name,
            is_bot: ctx.message.from.is_bot,
            language_code: ctx.message.from.language_code,
            chat_id: ctx.message.chat.id
        })
    }
    
});


bot.command("photo", async(ctx) => {
    let thing =`https://picsum.photos/400/300?random=` + ctx.update.message.message_id
    ctx.replyWithPhoto(thing, {
        reply_to_message_id: ctx.msg.message_id
    });
})


bot.command("users_data", async(ctx) => {
    const db = await database()    
    const users = await db.models.User.findAll()
    ctx.reply(JSON.stringify(users,null,2))
});

bot.command("send", async(ctx) => {
    const message = ctx.message
    const arr = message.text.split('/send ')

    if(arr.length==2){
        const db = await database()
        let users = await db.models.User.findAll()
        users.forEach(el => {
            bot.api.sendMessage(el.dataValues.user_id, arr[1]);
        })
    }
    else if(arr.length == 1) {
        await ctx.reply('Please enter something after /send', {
            reply_to_message_id: ctx.msg.message_id
        });
    }

});

bot.on("message", async (ctx) => {
    const chatId = ctx.msg.chat.id;
    const text = "I got your message!";
    await bot.api.sendMessage(chatId, text);
});

bot.start();


app.listen(PORT, () => console.log('server listening at *' + PORT))