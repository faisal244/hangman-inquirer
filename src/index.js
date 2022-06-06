const inquirer = require("inquirer");

const { gameSettingQuestions } = require("./questions");
const {
	getCategoryFromFile,
	getRandomWordFromList,
} = require("./utils/gameSettings");

const { initGame } = require("./utils/game");

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
};

init();