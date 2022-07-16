const { MessageEmbed } = require("discord.js");

class WordleGame {
  constructor(client, correctWord, interaction, baseGuesses) {
    this.client = client
    this.correctWord = correctWord
    this.user = interaction.member
    this.guesses = baseGuesses

    this.embed = new MessageEmbed() //constantly add new fields to the embed with different words to give feedback
      .setTitle("Wordle Game Progress")
      .setColor("GREEN")
      
  }

  validateLetter(char) {
    if (this.correctWord.includes(char)) return `:green_square:`

    return `:black_large_square:`
  }

  validateWord(guess) {
    if (guess.length != 5) return "Your guess must be 5 letters long!"
    if (/^[a-z]+$/i.test(str).test(guess)) return "Your guess must only contain letters!"

    this.embed = this.embed.addField(guess, 
      `${Array.from(guess).map(letter => `:regional_indicator_${letter}:`)}
      ${Array.from(guess).map(letter => this.validateLetter(letter))}`)

    return embed
  }

}

module.exports = WordleGame