const {MessageEmbed} = require("discord.js");

class WordleGame {
  constructor(client, correctWord, user) {
    this.client = client
    this.correctWord = correctWord
    this.user = user
  }

  validateWord(guess) {
    if (guess.length != 5) return "Your guess must be 5 letters long!"
    if (/^[a-z]+$/i.test(str).test(guess)) return "Your guess must only contain letters!"

    const embed = new MessageEmbed()

    return embed
  }

}

export default WordleGame