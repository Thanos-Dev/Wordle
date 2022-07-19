const Discord = require("discord.js");
const settings = require(`./botconfig/settings.json`);
const colors = require("colors");
const path = require('path');
const fs = require('fs');

const filesDir = path.join(__dirname, "botconfig")
fs.readdir(filesDir, (err, files) => {
  if (err) {
    console.error(`There was a problem reading ${filesDir}! Report this problem on the github page!`)
    process.exit(1)
  }

  if (!files.includes("config.json")) {
    if (files.includes("config.json.template")) {
      fs.rename("./botconfig/config.json.template", "./botconfig/config.json", console.error)
      console.log("Only the config template file was found! Automatically renamed it to config.json for you!".bold.yellow)
    } else {
      console.error("No config files were found! Ensure you downloaded the correct version from the official github page!".bold.yellow)
      process.exit(1)
    }
  }
})

const config = require(`./botconfig/config.json`);

const client = new Discord.Client({
    //fetchAllMembers: false,
    //restTimeOffset: 0,
    //restWsBridgetimeout: 100,
    shards: "auto",
    allowedMentions: {
      parse: [ ],
      repliedUser: false,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [ 
        Discord.Intents.FLAGS.GUILDS,
        //Discord.Intents.FLAGS.GUILD_MEMBERS,
        //Discord.Intents.FLAGS.GUILD_BANS,
        //Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        //Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        //Discord.Intents.FLAGS.GUILD_INVITES,
        //Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        //Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        //Discord.Intents.FLAGS.DIRECT_MESSAGES,
        //Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    presence: {
      activity: {
        name: `Music`, 
        type: "LISTENING", 
      },
      status: "online"
    }
});
//Define some Global Collections
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.gameInstances = new Discord.Collection();
client.categories = require("fs").readdirSync(`./commands`);
//Require the Handlers                  Add the antiCrash file too, if its enabled
["events", "commands", "slashCommands", settings.antiCrash ? "antiCrash" : null]
    .filter(Boolean)
    .forEach(h => {
        require(`./handlers/${h}`)(client);
    })
//Start the Bot
client.login(config.token)

/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
