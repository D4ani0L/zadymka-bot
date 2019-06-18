const Discord = require("discord.js");
const mongoose = require('mongoose');

require('dotenv').config();

const { reactToCommands } = require('./commands');
const { addNewUser, checkForNewUsers, increaseMessagesCount } = require('./dbOperations');

// Database
const db = process.env.DB_URL;
mongoose
  .connect(db, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error(err));

const client = new Discord.Client();

// Inicializacja i ustawanie statusu
client.once("ready", () => {
  console.log(`Bot ${client.user.tag} is now online!`);
  client.user.setPresence({
    game: {
      name: 'jak marnujesz życie | !pomoc',
      type: "WATCHING" //Ogląda...
    }
  });
  checkForNewUsers(client);
});

// reakcje na komendy
client.on("message", msg => {
  increaseMessagesCount(msg);
  reactToCommands(client, msg);
});

// operacje z bazą danych
client.on("guildMemberAdd", member => {
  addNewUser(member);
})

client.login(process.env.DISCORD_TOKEN);
