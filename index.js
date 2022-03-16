/*
Tid Til Tyrkia

V1.0

Skrevet av Gard
*/

//moduler
require("dotenv").config()
const discord = require('discord.js');
const client = new discord.Client({
    intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES, discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
})

//variabler
const token = process.env.BOT_TOKEN
const guildID = process.env.GUILD_ID
//init
client.login(token)

client.on("ready", () => {
    console.log("Client logged in succsessfully")
    //Oppsett av komandoer
    var guild = client.guilds.cache.get(guildID)
    var commands = guild.commands
    client.application.commands.create({
        name:"tid",
        description:"Hvor lenge er det igjen til tyrkia?",
    }, guildID)

})
client.on("interactionCreate", (interaction) => {
    if(!interaction.isCommand){
        return
    }
    const {
        commandName,
        options
    } = interaction
    var command = commandName.toLowerCase()
    switch(command){
        case "tid":
            var TyrkiaTid = new Date("05/28/2022")
            var today = new Date()
            var diff = TyrkiaTid.getTime()-today.getTime()
            console.log(TyrkiaTid)
            var daysLeft = diff/(1000 * 3600 * 24);
            var timeLeft = new Date().setDate(today.getDate()+daysLeft)
            interaction.reply(`Det er ${days(daysLeft)}igjen til Tyrkia`)
        break;
    }
})
function days(days) {
    var months = parseInt(days / 30);
    days = days - months * 30;
    var weeks = parseInt(days / 7);
    days = days - weeks * 7;
    days = Math.floor(days)
    months++
    return (months > 0 ? months + " måneder" + (months > 1 ? ", " : ", ") : "") + (weeks > 0 ? weeks + " uker" + (weeks > 1 ? ", " : " og ") : "") + (days > 0 ? days + " dager" + (days > 1 ? " " : ", ") : "") 
 }