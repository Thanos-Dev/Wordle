const { MessageEmbed } = require("discord.js")
const words = require("../data/words.json")

const countLetterOccurances = (string, char) => (string.split(char).length - 1)

class WordleGame {
  constructor(client, correctWord, interaction, baseGuesses) {
    this.client = client
    this.correctWord = correctWord
    this.user = interaction.member
    this.baseGuesses = baseGuesses
    this.guesses = baseGuesses

    this.embed = new MessageEmbed() //constantly add new fields to the embed with different words to give feedback
      .setTitle("Wordle Game Progress")
      .setColor("GREEN")
      .setFooter({text: `${this.baseGuesses - this.guesses}/${this.baseGuesses} Guesses Used\nMade By YEEEEEEOOWWW AAAAAAHHHHHH#5143`, iconURL: "https://cdn.discordapp.com/avatars/576777801013919744/8ec63e11e8273ec4409ab32d2be4ac79.webp?size=80"})
      
    console.log(correctWord)
  }

  validateLetter(char, index, guess) {
    if (char === this.correctWord[index]) return `:green_square:`

    else if (this.correctWord.includes(char)) {
      if (countLetterOccurances(this.correctWord, char) > 1) {
        //tmp
        return `:yellow_square:`
      } else {
        const i = this.correctWord.indexOf(char)
        if (guess[i] === char) return `:black_large_square:` 
        return `:yellow_square:`
      }
    }

    return `:black_large_square:`
  }

  validateWord(guess) {
    guess = guess.toLowerCase()

    if (guess.length !== 5) return "Your guess must be 5 letters long!"
    if (!(/^[a-z]+$/i.test(guess))) return "Your guess must only contain letters!"
    if (!(words.includes(guess))) return "Your guess must be included in the wordlist!"

    this.embed = this.embed.addField(guess,
      `${Array.from(guess).map(letter => `:regional_indicator_${letter}:`).join('')}
${Array.from(guess).map((letter, index) => this.validateLetter(letter, index, guess)).join('')} `)
    
    this.guesses--

    //update footer every turn
    return this.embed.setFooter({text: `${this.baseGuesses - this.guesses}/${this.baseGuesses} Guesses Used\nMade By YEEEEEEOOWWW AAAAAAHHHHHH#5143`, iconURL: "https://cdn.discordapp.com/avatars/576777801013919744/8ec63e11e8273ec4409ab32d2be4ac79.webp?size=80"})
  }

}

module.exports = WordleGame