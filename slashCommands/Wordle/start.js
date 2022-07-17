const { MessageEmbed, Collection, Client } = require("discord.js");
const words = require("../../data/words.json")
const WordleGame = require("../../classes/wordleGame.js");

module.exports = {
  name: "start", //the command name for the Slash Command
  description: "Start a Wordle game", //the command description for Slash Command Overview
  cooldown: 1,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  options: [ //OPTIONAL OPTIONS, make the array empty / dont add this option if you don't need options!
	//INFORMATIONS! You can add Options, but mind that the NAME MUST BE LOWERCASED! AND NO SPACES!!!, for the CHOCIES you need to add a array of arrays; [ ["",""] , ["",""] ] 
		//{"Integer": { name: "ping_amount", description: "How many times do you want to ping?", required: true }}, //to use in the code: interacton.getInteger("ping_amount")
		//{"String": { name: "title", description: "What should be the Embed title?", required: true }}, //to use in the code: interacton.getString("title")
		//{"String": { name: "description", description: "What should be the Embed Description? [ +n+ = NewLine ]", required: true }}, //to use in the code: interacton.getString("description")
		//{"String": { name: "color", description: "What should be the Embed Color?", required: false }}, //to use in the code: interacton.getString("color")
		//{"User": { name: "ping_a_user", description: "To Ping a user lol", required: false }}, //to use in the code: interacton.getUser("ping_a_user")
		//{"Channel": { name: "in_where", description: "In What Channel should I send it?", required: false }}, //to use in the code: interacton.getChannel("what_channel")
		//{"Role": { name: "what_role", description: "To Ping a Role lol", required: false }}, //to use in the code: interacton.getRole("what_role")
		//{"IntChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", 1], ["Discord Api", 2]] }}, //here the second array input MUST BE A NUMBER // TO USE IN THE CODE: interacton.getInteger("what_ping")
		//{"StringChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", "botping"], ["Discord Api", "api"]] }}, //here the second array input MUST BE A STRING // TO USE IN THE CODE: interacton.getString("what_ping")
  ],
  words: [],

  async run(client, interaction) {
    try{
	    //console.log(interaction, StringOption)
		
		//things u can directly access in an interaction!
		const { member, channelId, guildId, applicationId, 
		        commandName, deferred, replied, ephemeral, 
				options, createdTimestamp 
		} = interaction; 
		const { guild, id } = member;
    await interaction.reply({content: `Processing...`, ephemeral: true}); 

    if (!client.gameInstances.get(String(id))) {

      client.gameInstances.set(String(id), new WordleGame(client, words[Math.floor(Math.random()*words.length)], interaction, 7))
      const channel = guild.channels.cache.get(channelId);
      let embed = new MessageEmbed()
        .setTitle("Welcome to Wordle!")
        .setColor("GREEN")
  
        .addField("What is Wordle?", "Wordle is a guessing game. A 5 letter word is chosen for you to guess.")
        .addField("How do you play?", "You get 7 guesses and with each guess, you gain feedback. If the color of the emoji below your letter is gray, it means the letter does not exist in the word. If the color is yellow, it means the letter does exist in the word, but not at that place. If the color is green, it means the letter does exist in the word at that exact place.")
        .addField("How do I get started?", "To begin, just start typing 5 letter words! You may exit at any time by writing \"quit\".")
        .setFooter({text: "Made by YEEEEEEOOWWW AAAAAAHHHHHH#5143", iconURL: "https://cdn.discordapp.com/avatars/576777801013919744/8ec63e11e8273ec4409ab32d2be4ac79.webp?size=80"})

        //update it without a response!
      //SEND THE EMBED!
      await channel.send({embeds: [embed]});
      //Edit the reply
      interaction.editReply({content: `✅ Game Started!`, ephemeral: true}); 
    } else {
      interaction.editReply({content: `❌ Game Already In Progress!`, ephemeral: true})
    }
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
  }
}