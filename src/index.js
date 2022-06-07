const inquirer = require("inquirer");

const { gameSettingQuestions, generateGameQuestion } = require("./questions");
const { initGame, displayWord, displayHealth, play } = require("./utils/game");
const {
	getCategoryFromFile,
	getRandomWordFromList,
} = require("./utils/gameSettings");

const init = async () => {
	// prompt the game setting questions and store answers
	const answers = await inquirer.prompt(gameSettingQuestions);

	// ask the category question and console log the data from the chosen category
	const categoryDataFromFile = getCategoryFromFile(answers.category);

	// extract the level from categoryDataFromFile
	const wordList = categoryDataFromFile[answers.level];

	// pick a random word from wordList
	const word = getRandomWordFromList(wordList);

	// initial game for word
	initGame(word);

	// declare letters array to track letters from user
	const letters = [];
	let inProgress = true;
	let remainingAttempts = 10;
	let gameStatus = "LOSER";

	while (inProgress) {
		// get game question
		const gameQuestion = generateGameQuestion(
			answers.gameMode,
			answers.nickname
		);

		// prompt game question to get letter
		const { letter } = await inquirer.prompt(gameQuestion);

		if (!word.includes(letter)) {
			// reduce attempts
			remainingAttempts -= 1;
		}

		letters.push(letter);

		// play game for letter entered by user
		const newWord = play(letters, word);

		// display word
		displayWord(newWord);

		// display health
		displayHealth(remainingAttempts);

		// check if new word is equal to word
		if (word.toLowerCase() === newWord || remainingAttempts === 0) {
			if (word.toLowerCase() === newWord) {
				gameStatus = "WINNER";
			}
			inProgress = false;
		}
	}

	console.log(`GAME STATUS: ${gameStatus}`);
};

init();