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
      .setFooter({text: "Made by YEEEEEEOOWWW AAAAAAHHHHHH#5143", iconURL: "https://cdn.discordapp.com/avatars/576777801013919744/8ec63e11e8273ec4409ab32d2be4ac79.webp?size=80"})
      
    console.log(correctWord)
  }

  validateLetter(char, index) {
    if (char === this.correctWord[index]) return `:green_square:`
    else if (this.correctWord.includes(char)) return `:yellow_square:`

    return `:black_large_square:`
  }

  validateWord(guess) {
    guess = guess.toLowerCase()

    if (guess.length !== 5) return "Your guess must be 5 letters long!"
    if (!(/^[a-z]+$/i.test(guess))) return "Your guess must only contain letters!"

    this.embed = this.embed.addField(guess,
      `${Array.from(guess).map(letter => `:regional_indicator_${letter}:`).join('')}
      ${Array.from(guess).map((letter, index) => this.validateLetter(letter, index)).join('')} `)

    return this.embed
  }

}

module.exports = WordleGame