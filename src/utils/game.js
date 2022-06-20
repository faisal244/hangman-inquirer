const maskWord = (word) => word.replace(/[a-z]/gi, "_");

const displayWord = (word) => {
	console.log(`WORD: ${word}`);
};

const displayHealth = (attempts = 10) => {
	if (attempts > 0) {
		const healthArray = new Array(attempts).fill("❤️");

		console.log(`HEALTH: ${healthArray.join("")}`);
	} else {
		console.log(`HEALTH: NONE`);
	}
};

const displayGuessedLetters = (guessedLetters) => {
	console.log(`GUESSED LETTERS: ${guessedLetters.join(" | ")}`);
};

const initGame = (word) => {
	// mask word and log masked letters
	const maskedWord = maskWord(word);

	displayWord(maskedWord);

	// display initial health
	displayHealth();
};

const play = (letters, word) =>
	[...word.toLowerCase()]
		.map((letterFromWord) => {
			if (letterFromWord === " ") {
				return letterFromWord;
			}

			if (!letters.includes(letterFromWord)) {
				return "_";
			}

			return letterFromWord;
		})
		.join("");

module.exports = {
	initGame,
	displayWord,
	displayHealth,
	displayGuessedLetters,
	play,
};
