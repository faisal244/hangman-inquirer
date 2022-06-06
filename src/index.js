const inquirer = require("inquirer");

const { gameSettingQuestions, generateGameQuestion } = require("./questions");
const {
	getCategoryFromFile,
	getRandomWordFromList,
} = require("./utils/gameSettings");

const { initGame, displayWord, displayHealth } = require("./utils/game");

// ['e', 'x']
// t
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

	let counter = 3;

	// declare letters array to track letters from user
	const letters = [];

	while (counter > 0) {
		// get game question
		const gameQuestion = generateGameQuestion(
			answers.gameMode,
			answers.nickname
		);

		// prompt game question to get letter
		const { letter } = await inquirer.prompt(gameQuestion);

		console.log(letter);

		letters.push(letter);

		// play game for letter entered by user
		const newWord = play(letters, word);

		// display word
		displayWord(newWord);

		// display health
		displayHealth(9);

		counter -= 1;
	}

	console.log("END");
};

init();